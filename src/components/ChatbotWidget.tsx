import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2, Bot, User, Calendar, Clock } from 'lucide-react';

interface Message {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

interface ChatbotWidgetProps {
  onLeadCapture?: (data: { name: string; email: string; service: string }) => void;
  onAppointmentBooked?: (data: { name: string; email: string; date: string; time: string; service: string }) => void;
}

interface AppointmentData {
  name: string;
  email: string;
  date: string;
  time: string;
  service: string;
  timezone: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ onLeadCapture, onAppointmentBooked }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentFlow, setCurrentFlow] = useState<string>('welcome');
  const [leadData, setLeadData] = useState({ name: '', email: '', service: '' });
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    name: '', email: '', date: '', time: '', service: '', timezone: 'America/New_York'
  });
  const [isCapturingLead, setIsCapturingLead] = useState(false);
  const [isBookingAppointment, setIsBookingAppointment] = useState(false);
  const [bookingStep, setBookingStep] = useState<'name' | 'email' | 'date' | 'time' | 'confirm'>('name');
  const [hasShownInitialDelay, setHasShownInitialDelay] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Auto-open after 6 seconds on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownInitialDelay) {
        setIsOpen(true);
        setHasShownInitialDelay(true);
        initializeChat();
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [hasShownInitialDelay]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      content: "Hi! 👋 I'm the SlashByte Assistant.\n\nI can help you:\n• Book a free consultation\n• Get pricing information\n• Explore our AI & digital services\n• Answer questions about our work\n\nWhat would you like to do?",
      timestamp: new Date(),
      quickReplies: ['Book Free Consultation', 'Get Pricing Info', 'Explore Services', 'Ask Questions']
    };
    setMessages([welcomeMessage]);
    setCurrentFlow('welcome');
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      initializeChat();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const addMessage = (content: string, type: 'bot' | 'user', quickReplies?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      quickReplies
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (reply: string) => {
    addMessage(reply, 'user');
    
    setTimeout(() => {
      processUserInput(reply);
    }, 500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    addMessage(inputValue, 'user');
    const userInput = inputValue;
    setInputValue('');
    
    setTimeout(() => {
      processUserInput(userInput);
    }, 500);
  };

  const generateDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends for business appointments
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        const dateStr = date.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric' 
        });
        dates.push(dateStr);
      }
    }
    
    return dates.slice(0, 5); // Return 5 business days
  };

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (isBookingAppointment) {
      handleAppointmentBooking(input);
      return;
    }

    if (isCapturingLead) {
      handleLeadCapture(input);
      return;
    }

    // Main service flows
    if (lowerInput === 'book free consultation' || lowerInput.includes('book') || lowerInput.includes('appointment')) {
      startAppointmentBooking();
    } else if (lowerInput === 'get pricing info' || lowerInput.includes('price') || lowerInput.includes('cost')) {
      addMessage(
        "Here's our pricing overview:\n\n🤖  AI Solutions: \n• Chatbots: $2,000 - $8,000\n• RAG Systems: $5,000 - $15,000\n• Custom AI Apps: $3,000 - $12,000\n\n💻  Web Development: \n• Business Websites: $3,000 - $10,000\n• E-commerce: $5,000 - $20,000\n• Web Apps: $8,000 - $25,000\n\n📝  Content Services: \n• Blog Writing: $300 - $800/month\n• Social Media: $500 - $1,500/month\n• Full Strategy: $1,000 - $3,000/month\n\nWant a personalized quote?",
        'bot',
        ['Book Consultation for Quote', 'Tell Me More', 'Back to Main Menu']
      );
    } else if (lowerInput === 'explore services' || lowerInput.includes('services')) {
      addMessage(
        "We offer three main service categories:\n\n🤖  AI Solutions \n• Chatbots (Voice & Text)\n• RAG Document Systems\n• AI-Powered Applications\n\n💻  Digital Development \n• Website Development\n• Mobile Applications\n• E-commerce Platforms\n\n📝  Content & Marketing \n• Content Creation\n• Social Media Management\n• SEO & Digital Marketing\n\nWhich area interests you most?",
        'bot',
        ['AI Solutions', 'Digital Development', 'Content & Marketing', 'Book Consultation']
      );
    } else if (lowerInput === 'ask questions' || lowerInput.includes('question')) {
      addMessage(
        "I'm here to help! You can ask me about:\n\n• Our AI chatbot capabilities\n• Website development process\n• Content marketing strategies\n• Project timelines and pricing\n• Our team and experience\n• Case studies and portfolio\n\nWhat would you like to know?",
        'bot'
      );
    } else if (lowerInput === 'ai solutions' || lowerInput.includes('ai') || lowerInput.includes('chatbot')) {
      setCurrentFlow('ai');
      addMessage(
        "Great choice! 🤖 Our AI solutions include:\n\n Chatbots: \n• Web, WhatsApp, Voice integration\n• 24/7 customer support automation\n• Multi-language support\n\n RAG Systems: \n• Document search & Q&A\n• Knowledge base creation\n• Secure enterprise solutions\n\n Custom AI Apps: \n• Streamlit/Gradio dashboards\n• Predictive analytics\n• Process automation\n\nWould you like:",
        'bot',
        ['See AI Demo', 'Discuss Custom Solution', 'Get AI Pricing', 'Book AI Consultation']
      );
    } else if (lowerInput === 'digital development' || lowerInput.includes('website') || lowerInput.includes('web')) {
      setCurrentFlow('web');
      addMessage(
        "Excellent! 💻 Our development services:\n\n Websites: \n• Responsive business sites\n• E-commerce platforms\n• Custom web applications\n\n Mobile Apps: \n• iOS & Android development\n• Cross-platform solutions\n• AI-integrated apps\n\n Features: \n• Modern design & UX\n• SEO optimization\n• Performance focused\n\nInterested in:",
        'bot',
        ['Free Website Audit', 'Request Development Quote', 'View Portfolio', 'Book Dev Consultation']
      );
    } else if (lowerInput === 'content & marketing' || lowerInput.includes('content') || lowerInput.includes('marketing')) {
      setCurrentFlow('content');
      addMessage(
        "Perfect! ✍️ Our content services:\n\n Content Creation: \n• Blog posts & articles\n• Social media content\n• Email campaigns\n\n Strategy & Management: \n• Content planning\n• Social media management\n• SEO optimization\n\n Results: \n• Increased engagement\n• Better search rankings\n• Lead generation\n\nWant to:",
        'bot',
        ['Get Content Sample', 'Content Strategy Call', 'Content Pricing', 'Book Content Consultation']
      );
    } else if (lowerInput.includes('demo') || lowerInput === 'see ai demo') {
      addMessage(
        "I'd love to show you our AI capabilities! 🚀\n\nWe can demonstrate:\n• Live chatbot interactions\n• Document Q&A with RAG\n• Voice AI integration\n• Custom AI applications\n\nTo set up your personalized demo, let's schedule a quick 15-minute call. Sound good?",
        'bot',
        ['Yes, Book Demo Call', 'Tell Me More First', 'Back to AI Solutions']
      );
    } else if (lowerInput.includes('consultation') || lowerInput.includes('book') || lowerInput === 'yes, book demo call') {
      startAppointmentBooking();
    } else if (lowerInput === 'back to main menu') {
      setCurrentFlow('welcome');
      addMessage(
        "What else can I help you with?",
        'bot',
        ['Book Free Consultation', 'Get Pricing Info', 'Explore Services', 'Ask Questions']
      );
    } else if (lowerInput.includes('portfolio') || lowerInput === 'view portfolio') {
      addMessage(
        "Check out our recent work! 🎨\n\n AI Projects: \n• Healthcare chatbot system\n• Enterprise RAG platform\n• E-commerce AI integration\n\n Web Development: \n• Corporate website redesigns\n• E-commerce platforms\n• Custom web applications\n\n Content Success: \n• 200% engagement increase\n• SEO ranking improvements\n• Lead generation campaigns\n\nWant to discuss a similar project for your business?",
        'bot',
        ['Yes, Let\'s Discuss', 'Tell Me More', 'Book Consultation']
      );
    } else {
      // Default response for unrecognized input
      addMessage(
        "I'd be happy to help with that! Here are some ways I can assist:\n\n• Book a consultation - Free 15-min call\n• Get pricing - Customized quotes\n• Learn about services - AI, web, content\n• Ask specific questions  - Technical details\n\nWhat interests you most?",
        'bot',
        ['Book Free Consultation', 'Get Pricing Info', 'Explore Services', 'Ask Questions']
      );
    }
  };

  const startAppointmentBooking = () => {
    setIsBookingAppointment(true);
    setBookingStep('name');
    setAppointmentData({
      name: '', email: '', date: '', time: '', service: 'General Consultation', timezone: 'America/New_York'
    });
    
    addMessage(
      "Perfect! Let's book your free 15-minute consultation. 📅\n\nFirst, what's your name?",
      'bot'
    );
  };

  const handleAppointmentBooking = (input: string) => {
    switch (bookingStep) {
      case 'name':
        setAppointmentData(prev => ({ ...prev, name: input }));
        setBookingStep('email');
        addMessage(
          `Nice to meet you, ${input}! 👋\n\nWhat's your email address?`,
          'bot'
        );
        break;

      case 'email':
        setAppointmentData(prev => ({ ...prev, email: input }));
        setBookingStep('date');
        const dateOptions = generateDateOptions();
        addMessage(
          "Great! When would you prefer to meet?\n\nPlease choose a date:",
          'bot',
          dateOptions
        );
        break;

      case 'date':
        setAppointmentData(prev => ({ ...prev, date: input }));
        setBookingStep('time');
        addMessage(
          `Perfect! ${input} works well.\n\nWhat time would you prefer? (EST)`,
          'bot',
          timeSlots
        );
        break;

      case 'time':
        setAppointmentData(prev => ({ ...prev, time: input }));
        setBookingStep('confirm');
        addMessage(
          `Excellent! Let me confirm your appointment:\n\n👤  Name:  ${appointmentData.name}\n📧  Email:  ${appointmentData.email}\n📅  Date:  ${appointmentData.date}\n🕐  Time:  ${input} EST\n💼  Type:  Free Consultation\n\nShall I book this for you?`,
          'bot',
          ['Yes, Book It!', 'Change Date/Time', 'Cancel']
        );
        break;

      case 'confirm':
        if (input.toLowerCase().includes('yes') || input === 'Yes, Book It!') {
          bookAppointment();
        } else if (input.toLowerCase().includes('change')) {
          setBookingStep('date');
          const dateOptions = generateDateOptions();
          addMessage(
            "No problem! Let's pick a different time.\n\nWhich date works better?",
            'bot',
            dateOptions
          );
        } else {
          cancelBooking();
        }
        break;
    }
  };

  const bookAppointment = () => {
    // Here you would integrate with Google Calendar API
    // For now, we'll simulate the booking
    
    const finalAppointmentData = { ...appointmentData };
    onAppointmentBooked?.(finalAppointmentData);
    
    addMessage(
      `✅ Appointment Booked Successfully!\n\nYou'll receive a calendar invite at ${appointmentData.email} shortly.\n\n📅  Meeting Details: \n• Date: ${appointmentData.date}\n• Time: ${appointmentData.time} EST\n• Duration: 15 minutes\n• Type: Video call (link in invite)\n\n What to expect:\n• Discussion of your project needs\n• Service recommendations\n• Next steps and timeline\n\nLooking forward to speaking with you! 🚀\n\nAnything else I can help with today?`,
      'bot',
      ['Ask Another Question', 'Explore Services', 'End Chat']
    );
    
    // Reset booking state
    setIsBookingAppointment(false);
    setBookingStep('name');
    setAppointmentData({
      name: '', email: '', date: '', time: '', service: 'General Consultation', timezone: 'America/New_York'
    });
  };

  const cancelBooking = () => {
    setIsBookingAppointment(false);
    setBookingStep('name');
    setAppointmentData({
      name: '', email: '', date: '', time: '', service: 'General Consultation', timezone: 'America/New_York'
    });
    
    addMessage(
      "No worries! Your booking has been cancelled.\n\nIs there anything else I can help you with?",
      'bot',
      ['Try Booking Again', 'Get Pricing Info', 'Explore Services', 'Ask Questions']
    );
  };

  const handleLeadCapture = (input: string) => {
    if (!leadData.name) {
      setLeadData(prev => ({ ...prev, name: input }));
      addMessage(
        `Nice to meet you, ${input}! 👋 What's your email address?`,
        'bot'
      );
    } else if (!leadData.email) {
      setLeadData(prev => ({ ...prev, email: input }));
      
      const finalLeadData = { ...leadData, email: input };
      onLeadCapture?.(finalLeadData);
      
      addMessage(
        `Perfect! I've got your details:\n\n👤 Name: ${leadData.name}\n📧 Email: ${input}\n🎯 Interest: ${leadData.service}\n\nOur team will reach out within 24 hours. In the meantime, would you like to book a quick call?`,
        'bot',
        ['Yes, Book Call Now', 'Just Send Info', 'Ask Another Question']
      );
      
      setIsCapturingLead(false);
      setLeadData({ name: '', email: '', service: '' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpen}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        {/* CTA Badge */}
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
          Book Demo!
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-80 h-96'
      }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">SlashByte Assistant</h3>
              <p className="text-xs text-blue-100">
                {isBookingAppointment ? 'Booking Appointment...' : 'AI & Digital Solutions'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleMinimize}
              className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors duration-200"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={handleClose}
              className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}>
                    {message.type === 'bot' && (
                      <div className="flex items-center mb-1">
                        <Bot className="h-3 w-3 text-blue-600 mr-1" />
                        <span className="text-xs font-medium text-blue-600">Assistant</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line text-sm">{message.content}</div>
                    
                    {message.quickReplies && (
                      <div className="mt-3 space-y-1">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="block w-full text-left px-3 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-xs"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isBookingAppointment 
                      ? "Type your response..." 
                      : isCapturingLead 
                      ? "Enter your details..."
                      : "Type your message..."
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatbotWidget;