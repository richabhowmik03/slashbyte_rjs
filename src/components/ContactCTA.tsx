import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Let's discuss how our AI and digital solutions can help you achieve your goals. 
            Get in touch for a free consultation and personalized demo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/contact"
              className="group bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Start a Conversation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/contact"
              className="group border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;