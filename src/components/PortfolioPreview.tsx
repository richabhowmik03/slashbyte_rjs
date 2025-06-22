import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';

const PortfolioPreview = () => {
  const projects = [
    {
      title: 'Healthcare AI Chatbot',
      description: 'AI-powered patient assistance system with voice and text support for a major healthcare provider.',
      image: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'AI Solutions',
      tags: ['AI Chatbot', 'Healthcare', 'Voice AI']
    },
    {
      title: 'Document RAG System',
      description: 'Enterprise document search and Q&A system processing thousands of PDFs and documents.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'AI Solutions',
      tags: ['RAG Pipeline', 'Document Processing', 'Enterprise']
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with AI-powered recommendations and customer support.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Web Development',
      tags: ['E-commerce', 'Full-stack', 'AI Integration']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Our Recent Work
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses transform their operations with 
            innovative AI and digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link
                  to="/portfolio"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                >
                  View Details
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;