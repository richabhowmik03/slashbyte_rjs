// Google Calendar Integration Utility
// This file contains the logic for Google Calendar OAuth2 and appointment booking

interface CalendarEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees: Array<{
    email: string;
    displayName?: string;
  }>;
  reminders: {
    useDefault: boolean;
    overrides?: Array<{
      method: string;
      minutes: number;
    }>;
  };
}

interface AppointmentData {
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
  timezone: string;
}

// Google Calendar API configuration
const GOOGLE_CALENDAR_CONFIG = {
  CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
  API_KEY: process.env.REACT_APP_GOOGLE_API_KEY || '',
  DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
  SCOPES: 'https://www.googleapis.com/auth/calendar.events',
  CALENDAR_ID: process.env.REACT_APP_GOOGLE_CALENDAR_ID || 'primary'
};

class GoogleCalendarService {
  private gapi: any;
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load Google API
      await this.loadGoogleAPI();
      
      // Initialize gapi
      await this.gapi.load('client:auth2', async () => {
        await this.gapi.client.init({
          apiKey: GOOGLE_CALENDAR_CONFIG.API_KEY,
          clientId: GOOGLE_CALENDAR_CONFIG.CLIENT_ID,
          discoveryDocs: [GOOGLE_CALENDAR_CONFIG.DISCOVERY_DOC],
          scope: GOOGLE_CALENDAR_CONFIG.SCOPES
        });
        
        this.isInitialized = true;
      });
    } catch (error) {
      console.error('Failed to initialize Google Calendar API:', error);
      throw error;
    }
  }

  private loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as any).gapi) {
        this.gapi = (window as any).gapi;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => {
        this.gapi = (window as any).gapi;
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async signIn(): Promise<boolean> {
    try {
      await this.initialize();
      
      const authInstance = this.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      
      return user.isSignedIn();
    } catch (error) {
      console.error('Google sign-in failed:', error);
      return false;
    }
  }

  async isSignedIn(): Promise<boolean> {
    try {
      await this.initialize();
      const authInstance = this.gapi.auth2.getAuthInstance();
      return authInstance.isSignedIn.get();
    } catch (error) {
      console.error('Failed to check sign-in status:', error);
      return false;
    }
  }

  private parseDateTime(date: string, time: string, timezone: string): string {
    // Convert date string like "Monday, Jan 15" to proper date
    const currentYear = new Date().getFullYear();
    const dateStr = `${date} ${currentYear}`;
    const parsedDate = new Date(dateStr);
    
    // Parse time string like "2:00 PM"
    const [timeStr, period] = time.split(' ');
    const [hours, minutes] = timeStr.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    parsedDate.setHours(hour24, minutes || 0, 0, 0);
    
    return parsedDate.toISOString();
  }

  async createEvent(appointmentData: AppointmentData): Promise<boolean> {
    try {
      await this.initialize();
      
      const startDateTime = this.parseDateTime(
        appointmentData.date, 
        appointmentData.time, 
        appointmentData.timezone
      );
      
      const endDate = new Date(startDateTime);
      endDate.setMinutes(endDate.getMinutes() + 15); // 15-minute consultation
      
      const event: CalendarEvent = {
        summary: `SlashByte Consultation - ${appointmentData.name}`,
        description: `Free consultation call with ${appointmentData.name}\n\nService Interest: ${appointmentData.service}\nEmail: ${appointmentData.email}\n\nMeeting Link: [Video call link will be added automatically]\n\nAgenda:\n- Discuss project requirements\n- Service recommendations\n- Timeline and next steps`,
        start: {
          dateTime: startDateTime,
          timeZone: appointmentData.timezone,
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: appointmentData.timezone,
        },
        attendees: [
          {
            email: appointmentData.email,
            displayName: appointmentData.name,
          }
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 15 }, // 15 minutes before
          ],
        },
      };

      const response = await this.gapi.client.calendar.events.insert({
        calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
        resource: event,
        sendUpdates: 'all', // Send email invitations
      });

      console.log('Event created successfully:', response);
      return true;
    } catch (error) {
      console.error('Failed to create calendar event:', error);
      return false;
    }
  }

  async checkAvailability(date: string, time: string): Promise<boolean> {
    try {
      await this.initialize();
      
      const startDateTime = this.parseDateTime(date, time, 'America/New_York');
      const endDate = new Date(startDateTime);
      endDate.setMinutes(endDate.getMinutes() + 15);
      
      const response = await this.gapi.client.calendar.events.list({
        calendarId: GOOGLE_CALENDAR_CONFIG.CALENDAR_ID,
        timeMin: startDateTime,
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.result.items.length === 0; // Available if no conflicts
    } catch (error) {
      console.error('Failed to check availability:', error);
      return false; // Assume not available on error
    }
  }
}

// Export singleton instance
export const googleCalendarService = new GoogleCalendarService();

// Helper function for chatbot integration
export async function bookAppointment(appointmentData: AppointmentData): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Check if user is signed in
    const isSignedIn = await googleCalendarService.isSignedIn();
    
    if (!isSignedIn) {
      // Attempt to sign in
      const signInSuccess = await googleCalendarService.signIn();
      if (!signInSuccess) {
        return {
          success: false,
          message: 'Google Calendar authorization required. Please try again and allow calendar access.'
        };
      }
    }

    // Check availability
    const isAvailable = await googleCalendarService.checkAvailability(
      appointmentData.date, 
      appointmentData.time
    );

    if (!isAvailable) {
      return {
        success: false,
        message: 'This time slot is no longer available. Please choose a different time.'
      };
    }

    // Create the event
    const eventCreated = await googleCalendarService.createEvent(appointmentData);

    if (eventCreated) {
      return {
        success: true,
        message: 'Appointment booked successfully! Calendar invite sent to your email.'
      };
    } else {
      return {
        success: false,
        message: 'Failed to create calendar event. Please try again or contact us directly.'
      };
    }
  } catch (error) {
    console.error('Appointment booking error:', error);
    return {
      success: false,
      message: 'An error occurred while booking your appointment. Please try again.'
    };
  }
}
