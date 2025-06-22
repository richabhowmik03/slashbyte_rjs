import React, { useState } from 'react';
import { 
  Bot, 
  Brain, 
  Smartphone, 
  Code, 
  Palette, 
  TrendingUp,
  Mic,
  FileSearch,
  MessageSquare,
  Users,
  Shield,
  Zap
} from 'lucide-react';

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('ai');

  const tabs = [
    { id: 'ai', label: 'AI Solutions', icon: Brain },
    { id: 'digital', label: 'Digital & Creative', icon: Code }
  ];

  const aiServices = [
    {
      icon: Bot,
      title: 'AI Chatbots (Voice & Text)',
      description: 'Intelligent conversational AI for web, WhatsApp, IVR systems, and call centers.',
      features: [
        'Multi-platform deployment (Web, WhatsApp, IVR)',
        'Voice and text interaction capabilities',
        'Industry-specific customization (Healthcare, E-commerce, HR, Education)',
        'Natural language processing and understanding',
        '24/7 automated customer support',
        'Integration with existing systems'
      ],
      useCases: ['Customer Support', 'Lead Generation', 'Appointment Booking', 'FAQ Automation']
    },
    {
      icon: Brain,
      title: 'RAG Pipelines',
      description: 'Enterprise document search and Q&A systems with secure, multi-format support.',
      features: [
        'Secure document processing and storage',
        'Multi-format support (PDF, DOCX, TXT, websites)',
        'Intelligent document chunking and embedding',
        'Advanced search and retrieval capabilities',
        'Custom knowledge base creation',
        'Real-time document updates'
      ],
      useCases: ['Document Search', 'Knowledge Management', 'Compliance Q&A', 'Research Assistance']
    },
    {
      icon: Smartphone,
      title: 'AI-Powered Apps',
      description: 'Custom applications with AI integration using modern frameworks and technologies.',
      features: [
        'Streamlit and Gradio app development',
        'Interactive dashboards and analytics',
        'Custom AI model integration',
        'Real-time data processing',
        'User-friendly interfaces',
        'Cloud deployment and scaling'
      ],
      useCases: ['Data Analytics', 'Predictive Modeling', 'Process Automation', 'Decision Support']
    },
    {
      icon: Mic,
      title: 'Voice AI Integration',
      description: 'Advanced voice processing and AI integration for various applications.',
      features: [
        'Speech-to-text and text-to-speech',
        'Voice bot development',
        'Call center automation',
        'Voice command interfaces',
        'Multi-language support',
        'Real-time voice processing'
      ],
      useCases: ['Voice Assistants', 'Call Automation', 'Voice Commands', 'Accessibility Features']
    }
  ];

  const digitalServices = [
    {
      icon: Code,
      title: 'Web & App Development',
      description: 'Full-stack development for scalable, secure, and modern applications.',
      features: [
        'Custom web application development',
        'Mobile app development (iOS/Android)',
        'Progressive Web Apps (PWA)',
        'API development and integration',
        'Database design and optimization',
        'Cloud deployment and DevOps'
      ],
      useCases: ['E-commerce Platforms', 'Business Applications', 'Content Management', 'Mobile Apps']
    },
    {
      icon: Palette,
      title: 'UI/UX & Branding',
      description: 'Complete design solutions from wireframes to brand identity.',
      features: [
        'User experience research and design',
        'Wireframing and prototyping',
        'Brand identity and logo design',
        'Design system creation',
        'Visual design and graphics',
        'Brand guideline development'
      ],
      useCases: ['Brand Identity', 'Website Design', 'App Interfaces', 'Marketing Materials']
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing services to grow your online presence.',
      features: [
        'Social media marketing and management',
        'Search engine optimization (SEO)',
        'Content creation and strategy',
        'Email marketing campaigns',
        'Analytics and performance tracking',
        'Paid advertising management'
      ],
      useCases: ['Brand Awareness', 'Lead Generation', 'Content Marketing', 'Online Growth']
    }
  ];

  const currentServices = activeTab === 'ai' ? aiServices : digitalServices;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with comprehensive digital services 
              to deliver end-to-end solutions that transform businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 p-1 rounded-xl flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {currentServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-xl mr-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {service.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Use Cases:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.useCases.map((useCase, useCaseIndex) => (
                        <span
                          key={useCaseIndex}
                          className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and client satisfaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Discovery',
                description: 'We start by understanding your business needs, challenges, and goals through detailed consultation.'
              },
              {
                icon: Palette,
                title: 'Design',
                description: 'Our team creates comprehensive plans, wireframes, and designs tailored to your requirements.'
              },
              {
                icon: Code,
                title: 'Development',
                description: 'We build your solution using cutting-edge technologies and best practices for optimal performance.'
              },
              {
                icon: Zap,
                title: 'Deployment',
                description: 'We deploy, test, and optimize your solution, providing ongoing support and maintenance.'
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss your project and see how our services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg shadow-lg"
            >
              Start Your Project
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 font-semibold text-lg"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;