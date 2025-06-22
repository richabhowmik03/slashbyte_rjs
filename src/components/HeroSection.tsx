import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Brain, Code, Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32 overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Digital Solutions
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Empowering Businesses with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              AI & Digital Solutions
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            From AI chatbots and RAG pipelines to full-stack development and digital marketing, 
            we transform your business challenges into intelligent solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              to="/portfolio"
              className="group bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            >
              See Our Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/contact"
              className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book a Demo
            </Link>
          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center group">
              <div className="bg-white p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 group-hover:-translate-y-2">
                <Bot className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Chatbots</h3>
              <p className="text-gray-600 text-sm text-center">Voice & text chatbots for web, WhatsApp, and call centers</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="bg-white p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 group-hover:-translate-y-2">
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">RAG Systems</h3>
              <p className="text-gray-600 text-sm text-center">Intelligent document search and Q&A solutions</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="bg-white p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-4 group-hover:-translate-y-2">
                <Code className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Full-Stack Dev</h3>
              <p className="text-gray-600 text-sm text-center">Custom web, mobile, and AI-powered applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;