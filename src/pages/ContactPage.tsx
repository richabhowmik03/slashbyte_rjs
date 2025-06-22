import React, { useState, useEffect } from 'react';
import { ScheduleSection } from "/Users/richabhowmik/Downloads/project/src/pages/ScheduleSection.tsx";

import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { send, init } from '@emailjs/browser';


// EmailJS configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  serviceId: 'service_p6qsr5e',
  templateId: 'template_ezzaaua',
  publicKey: 'ypl6IS5dcZXqUMHsc'
};

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Initialize EmailJS once
    init(EMAILJS_CONFIG.publicKey);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      setSubmitError('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address.');
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    try {
      const result = await send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company || 'Not specified',
          project_type: formData.projectType,
          message: formData.message,
          to_email: 'contact.richabhowmik@gmail.com'
        }
      );

      console.log('EmailJS success:', result);
      setIsSubmitted(true);

      // Reset form after a moment
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 5000);
    } catch (err: any) {
      console.error('EmailJS error:', err);
      setSubmitError(
        err.text || err.message ||
        'Unable to send email automatically. Please use one of the direct contact methods below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectEmail = () => {
    window.location.href = 'mailto:slashbyte.org@gmail.com?subject=Project Inquiry';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in your AI and digital solutions. Can we discuss my project?");
    window.open(`https://wa.me/+918787360636?text=${message}`, '_blank');
  };

  const handlePhone = () => {
    window.location.href = 'tel:+916009915076';
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Let's Build Something Amazing Together
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business with AI and digital solutions? Get in touch for a free consultation and personalized demo.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Start Your Project</h2>

            {isSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-green-800">Message sent successfully! We'll get back to you within 24 hours.</span>
              </div>
            )}

            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                <span className="text-red-800">{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  >
                    <option value="">Select project type</option>
                    <option value="ai-chatbot">AI Chatbot</option>
                    <option value="rag-system">RAG System</option>
                    <option value="web-development">Web Development</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="branding-design">Branding & Design</option>
                    <option value="digital-marketing">Digital Marketing</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            {/* Alternative Contact Methods */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Prefer direct contact?</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleDirectEmail}
                  className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                  <Mail className="mr-2 h-4 w-4" /> Email Directly
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </button>
                <button
                  onClick={handlePhone}
                  className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                >
                  <Phone className="mr-2 h-4 w-4" /> Call Now
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Get in Touch</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <button
                    onClick={handleDirectEmail}
                    className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    hello@slashbyte.org
                  </button>
                  <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <button
                    onClick={handleWhatsApp}
                    className="text-green-600 hover:text-green-700 transition-colors duration-200"
                  >
                    +91 (600) 991-5076
                  </button>
                  <p className="text-sm text-gray-500">Quick responses during business hours</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <button
                    onClick={handlePhone}
                    className="text-purple-600 hover:text-purple-700 transition-colors duration-200"
                  >
                    +91 (600) 991-5076
                  </button>
                  <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM EST</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 p-6 rounded-xl w-full max-w-md mx-auto"></div>
            <ScheduleSection />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-8">
            {[
              {
                question: "What's the typical timeline for an AI project?",
                answer: "AI projects typically take 4-12 weeks depending on complexity. Simple chatbots can be ready in 2-4 weeks, while complex RAG systems may take 8-12 weeks. We provide detailed timelines during our initial consultation."
              },
              {
                question: "Do you provide ongoing support and maintenance?",
                answer: "Yes, we offer comprehensive support packages including regular updates, monitoring, performance optimization, and feature enhancements. We ensure your solutions stay current and perform optimally."
              },
              {
                question: "Can you integrate with our existing systems?",
                answer: "Absolutely. We specialize in seamless integrations with existing business systems, databases, and workflows. Our solutions are designed to enhance, not replace, your current infrastructure."
              },
              {
                question: "What makes SlashByte different from other agencies?",
                answer: "We combine deep AI expertise with comprehensive digital services. Our human-centered approach, proven healthcare focus, and end-to-end capabilities make us unique in delivering complete solutions."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;