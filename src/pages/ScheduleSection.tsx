"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Clock, CheckCircle, User, Mail, Phone } from "lucide-react";

// Simple CalendarDemo component using shadcn/ui Calendar
import { Calendar } from "@/components/ui/calendar";

interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  time: string;
  message: string;
}

function CalendarDemo({ selectedDate, onDateSelect, onScheduleCall }: {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onScheduleCall: (bookingData: BookingData) => void;
}) {
  const [formStep, setFormStep] = React.useState<number>(1);
  const [bookingData, setBookingData] = React.useState<BookingData>({
    name: "",
    email: "",
    phone: "",
    service: "Project Consultation",
    time: "",
    message: ""
  });

  // Generate time slots based on whether it's weekend or weekday
  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const startTime = isWeekend ? 10 : 9;
    const endTime = isWeekend ? 16 : 18;

    for (let hour = startTime; hour < endTime; hour++) {
      // Skip lunch hour (12-13)
      if (hour === 12) continue;
      
      for (let minute = 0; minute < 60; minute += 30) {
        let displayHour = hour;
        let period = "AM";

        if (hour >= 12) {
          period = "PM";
        }

        if (hour > 12) {
          displayHour = hour - 12;
        } else if (hour === 0) {
          displayHour = 12;
        }

        const time = `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
        slots.push(time);
      }
    }

    return slots;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (formStep === 1) {
      // Validate required fields
      if (!bookingData.name || !bookingData.email || !bookingData.phone) {
        alert("Please fill in all required fields.");
        return;
      }
      setFormStep(2);
    } else if (formStep === 2) {
      // Validate service and time selection
      if (!bookingData.service || !bookingData.time) {
        alert("Please select a service and time slot.");
        return;
      }
      setFormStep(3);
    }
  };

  const handleScheduleCall = () => {
    if (!bookingData.time) {
      alert("Please select a time slot.");
      return;
    }
    onScheduleCall(bookingData);
  };

  const handleBack = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const availableSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        className="w-full rounded-md border shadow-sm"
        captionLayout="dropdown"
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return date < today;
        }}
      />
      
      {selectedDate && (
        <div className="mt-4 p-4 bg-white rounded-lg border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              {formStep === 1 ? "Personal Details" : 
               formStep === 2 ? "Service & Time" : 
               "Confirm Booking"}
            </h4>
            <span className="text-sm text-gray-500">
              Step {formStep} of 3
            </span>
          </div>

          {/* Step 1: Personal Information */}
          {formStep === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2: Service and Time Selection */}
          {formStep === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingData.service}
                  onChange={handleInputChange}
                >
                  <option value="Project Consultation">Project Consultation (Free)</option>
                  <option value="Technical Review">Technical Review ($100)</option>
                  <option value="Strategy Session">Strategy Session ($150)</option>
                  <option value="Full Project Planning">Full Project Planning ($200)</option>
                </select>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  Available Time Slots for {selectedDate.toLocaleDateString()}
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setBookingData({...bookingData, time})}
                      className={`p-2 rounded-md border text-sm font-medium transition-colors ${
                        bookingData.time === time
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {formStep === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h5 className="font-medium text-gray-900 mb-2">Booking Summary</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {bookingData.time}</p>
                  <p><strong>Service:</strong> {bookingData.service}</p>
                  <p><strong>Name:</strong> {bookingData.name}</p>
                  <p><strong>Email:</strong> {bookingData.email}</p>
                  <p><strong>Phone:</strong> {bookingData.phone}</p>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={bookingData.message}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or questions?"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleScheduleCall}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium flex items-center justify-center"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm Booking
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ScheduleSection() {
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  const [scheduledCall, setScheduledCall] = React.useState<{
    bookingData: BookingData;
    date: Date;
  } | null>(null);

  const handleScheduleCall = async (bookingData: BookingData) => {
    if (!selectedDate) return;

    // Here you would typically save to your database
    // For now, we'll just simulate the booking
    const appointmentData = {
      ...bookingData,
      appointmentDate: selectedDate.toLocaleDateString(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      // Simulate API call
      console.log("Booking appointment:", appointmentData);
      
      // In a real app, you'd make an API call here:
      // const response = await fetch('/api/appointments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(appointmentData)
      // });

      setScheduledCall({ bookingData, date: selectedDate });
      setShowCalendar(false); // Close modal after booking
      
      // Optional: Send confirmation email
      // await sendConfirmationEmail(appointmentData);
      
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred while booking the appointment. Please try again.");
    }
  };

  const handleReset = () => {
    setScheduledCall(null);
    setSelectedDate(undefined);
    setShowCalendar(false);
  };

  const handleCloseModal = () => {
    setShowCalendar(false);
    setSelectedDate(undefined);
  };

  if (scheduledCall) {
    return (
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center mb-4">
          <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="font-semibold text-green-900">
            Appointment Scheduled Successfully!
          </h3>
        </div>
        
        <div className="bg-white p-4 rounded-lg mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Booking Details:</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <p><strong>Date:</strong> {scheduledCall.date.toLocaleDateString()}</p>
            <p><strong>Time:</strong> {scheduledCall.bookingData.time}</p>
            <p><strong>Service:</strong> {scheduledCall.bookingData.service}</p>
            <p><strong>Name:</strong> {scheduledCall.bookingData.name}</p>
            <p><strong>Email:</strong> {scheduledCall.bookingData.email}</p>
          </div>
        </div>
        
        <p className="text-green-700 mb-4">
          A confirmation email has been sent to <strong>{scheduledCall.bookingData.email}</strong> with all the details and meeting link.
        </p>
        
        <p className="text-green-600 text-sm mb-4">
          Please save this information and be available 5 minutes before the scheduled time.
        </p>
        
        <button
          onClick={handleReset}
          className="bg-white border border-green-300 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium"
        >
          Schedule Another Appointment
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="font-semibold text-gray-900 mb-4">
          Prefer to schedule a call?
        </h3>
        <p className="text-gray-600 mb-6">
          Book a free 30-minute consultation to discuss your project in detail. Our expert team will help you understand the best approach for your needs.
        </p>
        
        <button
          onClick={() => setShowCalendar(true)}
          className="w-full bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center"
        >
          <CalendarIcon className="mr-2 h-5 w-5" />
          Schedule Free Consultation
        </button>
      </div>

      {/* Modal Overlay */}
      {showCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Schedule Your Free Consultation
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <CalendarDemo 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                onScheduleCall={handleScheduleCall}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
