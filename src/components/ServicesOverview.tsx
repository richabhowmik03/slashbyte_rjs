import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Brain, 
  Smartphone, 
  Code, 
  Palette, 
  TrendingUp,
  ArrowRight,
  Mic,
  FileSearch
} from 'lucide-react';

const ServicesOverview = () => {
  const services = [
    {
      icon: Bot,
      title: 'AI Chatbots',
      description: 'Voice & text chatbots for web, WhatsApp, IVR systems. Customizable for healthcare, e-commerce, HR, and education.',
      features: ['Multi-platform deployment', 'Voice & text support', 'Industry-specific customization'],
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'RAG Pipelines',
      description: 'Enterprise document search & Q&A systems. Secure, multi-format support for PDFs, DOCX, and websites.',
      features: ['Document intelligence', 'Secure processing', 'Multi-format support'],
      color: 'purple'
    },
    {
      icon: Smartphone,
      title: 'AI-Powered Apps',
      description: 'Custom applications built with Streamlit, Gradio, web, and mobile technologies with AI integration.',
      features: ['Interactive dashboards', 'Analytics tools', 'Custom AI integration'],
      color: 'green'
    },
    {
      icon: Code,
      title: 'Web & App Development',
      description: 'Full-stack development services for scalable, secure, and modern web and mobile applications.',
      features: ['Custom development', 'Scalable architecture', 'Modern technologies'],
      color: 'indigo'
    },
    {
      icon: Palette,
      title: 'UI/UX & Branding',
      description: 'Complete design solutions from wireframes and prototypes to brand identity and guidelines.',
      features: ['User experience design', 'Brand identity', 'Design systems'],
      color: 'pink'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing services including social media, SEO, and content creation.',
      features: ['Social media marketing', 'SEO optimization', 'Content strategy'],
      color: 'orange'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      pink: 'bg-pink-50 text-pink-600 border-pink-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We blend cutting-edge AI technology with comprehensive digital services 
            to deliver end-to-end solutions for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex p-3 rounded-lg ${getColorClasses(service.color)} mb-6`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  to="/services"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;