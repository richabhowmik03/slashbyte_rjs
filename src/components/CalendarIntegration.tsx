import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { googleCalendarService, bookAppointment } from '../utils/googleCalendar';

interface CalendarIntegrationProps {
  appointmentData: {
    name: string;
    email: string;
    date: string;
    time: string;
    service: string;
    timezone: string;
  };
  onBookingComplete: (success: boolean, message: string) => void;
  onCancel: () => void;
}

const CalendarIntegration: React.FC<CalendarIntegrationProps> = ({
  appointmentData,
  onBookingComplete,
  onCancel
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<'checking' | 'signed-in' | 'signed-out'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const isSignedIn = await googleCalendarService.isSignedIn();
      setAuthStatus(isSignedIn ? 'signed-in' : 'signed-out');
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthStatus('signed-out');
      setError('Failed to check Google Calendar authorization');
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await googleCalendarService.signIn();
      if (success) {
        setAuthStatus('signed-in');
      } else {
        setError('Google sign-in was cancelled or failed');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('Failed to sign in to Google Calendar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await bookAppointment(appointmentData);
      onBookingComplete(result.success, result.message);
    } catch (error) {
      console.error('Booking error:', error);
      onBookingComplete(false, 'An unexpected error occurred while booking your appointment');
    } finally {
      setIsLoading(false);
    }
  };

  if (authStatus === 'checking') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Checking Google Calendar access...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-3" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Book Your Consultation
        </h3>
        <p className="text-gray-600">
          We'll add this appointment to your Google Calendar and send you a meeting link.
        </p>
      </div>

      {/* Appointment Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Appointment Details:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-16">Name:</span>
            <span className="text-gray-600">{appointmentData.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-16">Email:</span>
            <span className="text-gray-600">{appointmentData.email}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-600">{appointmentData.date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-gray-600">{appointmentData.time} EST (15 minutes)</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-700 w-16">Type:</span>
            <span className="text-gray-600">{appointmentData.service}</span>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Authorization Status */}
      {authStatus === 'signed-out' && (
        <div className="mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <ExternalLink className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 text-sm">
                Google Calendar access required to book your appointment
              </span>
            </div>
          </div>
          
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect Google Calendar
              </>
            )}
          </button>
        </div>
      )}

      {/* Booking Actions */}
      {authStatus === 'signed-in' && (
        <div className="space-y-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 text-sm">Google Calendar connected</span>
            </div>
          </div>

          <button
            onClick={handleBookAppointment}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Booking Appointment...
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                Confirm Booking
              </>
            )}
          </button>
        </div>
      )}

      {/* Cancel Button */}
      <button
        onClick={onCancel}
        disabled={isLoading}
        className="w-full mt-3 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        Cancel
      </button>

      {/* Privacy Notice */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>
          We only access your calendar to create this appointment. 
          Your calendar data remains private and secure.
        </p>
      </div>
    </div>
  );
};

export default CalendarIntegration;