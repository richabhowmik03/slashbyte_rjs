import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import DemoPage from './pages/DemoPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';

function App() {

  const handleLeadCapture = (leadData: { name: string; email: string; service: string }) => {
    console.log('Lead captured:', leadData);
    // Here you can integrate with your CRM, email service, or analytics
    // For example: send to your backend API, Google Analytics, etc.
  };

  const handleAppointmentBooked = (appointmentData: { name: string; email: string; date: string; time: string; service: string }) => {
    console.log('Appointment booked:', appointmentData);
    // Here you would integrate with Google Calendar API
    // Example: POST to your backend API that handles Google Calendar OAuth
    // fetch('/api/book-appointment', { method: 'POST', body: JSON.stringify(appointmentData) })
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<CareersPage />} />
        </Routes>
        <Footer />
        <ChatbotWidget 
          onLeadCapture={handleLeadCapture}
          onAppointmentBooked={handleAppointmentBooked}
        />
      </div>
    </Router>
  );
}

export default App;