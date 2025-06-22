import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI Solutions' },
    { id: 'web', label: 'Web Development' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'ecommerce', label: 'E-commerce' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Healthcare AI Assistant',
      description: 'Comprehensive AI-powered patient assistance system with voice and text support for a major healthcare provider.',
      longDescription: 'Developed a sophisticated AI chatbot system that handles patient inquiries, appointment scheduling, and provides medical information. The system integrates with existing hospital management systems and supports multiple languages.',
      image: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: ['ai', 'healthcare'],
      tags: ['AI Chatbot', 'Healthcare', 'Voice AI', 'NLP'],
      technologies: ['Python', 'OpenAI', 'FastAPI', 'React', 'PostgreSQL'],
      results: [
        '80% reduction in call center volume',
        '24/7 patient support availability',
        '95% user satisfaction rate',
        'Multilingual support for 5 languages'
      ]
    },
    {
      id: 2,
      title: 'Enterprise RAG System',
      description: 'Advanced document search and Q&A system processing thousands of enterprise documents with secure access controls.',
      longDescription: 'Built a comprehensive RAG (Retrieval-Augmented Generation) system that allows employees to search and query internal documents, policies, and knowledge bases using natural language.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: ['ai'],
      tags: ['RAG Pipeline', 'Document Processing', 'Enterprise', 'Search'],
      technologies: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'Docker'],
      results: [
        '70% faster information retrieval',
        'Support for 10,000+ documents',
        'Advanced security and access controls',
        'Real-time document indexing'
      ]
    },
    {
      id: 3,
      title: 'E-commerce Platform with AI',
      description: 'Full-stack e-commerce solution with AI-powered recommendations, chatbot support, and analytics dashboard.',
      longDescription: 'Complete e-commerce platform featuring AI-driven product recommendations, intelligent search, automated customer support, and comprehensive analytics.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: ['web', 'ecommerce', 'ai'],
      tags: ['E-commerce', 'Full-stack', 'AI Integration', 'Analytics'],
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
      results: [
        '150% increase in conversion rates',
        '60% improvement in user engagement',
        'Automated 80% of customer inquiries',
        'Real-time inventory management'
      ]
    },
    {
      id: 4,
      title: 'Medical Diagnosis Dashboard',
      description: 'AI-powered diagnostic assistance tool for medical professionals with image analysis and reporting features.',
      longDescription: 'Developed an AI-assisted diagnostic platform that helps medical professionals analyze medical images, generate reports, and provide treatment recommendations.',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: ['ai', 'healthcare'],
      tags: ['Medical AI', 'Image Analysis', 'Healthcare', 'Dashboard'],
      technologies: ['Python', 'TensorFlow', 'React', 'Flask', 'PostgreSQL'],
      results: [
        '40% faster diagnosis time',
        '98% accuracy in image analysis',
        'Integrated with hospital systems',
        'HIPAA compliant security'
      ]
    },
    {
      id: 5,
      title: 'Corporate Website Redesign',
      description: 'Modern, responsive website redesign for a Fortune 500 company with improved UX and performance.',
      longDescription: 'Complete website overhaul focusing on modern design principles, improved user experience, and optimal performance across all devices.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: ['web'],
      tags: ['Web Design', 'UX/UI', 'Responsive', 'Performance'],
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
      results: [
        '200% improvement in page load speed',
        '85% increase in mobile usage',
        '120% boost in user engagement',
        'Fully accessible design'
      ]
    },
    {
      id: 6,
      title: 'Retail Analytics Platform',
      description: 'Comprehensive analytics dashboard for retail chains with AI-powered insights and predictive modeling.',
      longDescription: 'Built a sophisticated analytics platform that provides real-time insights, sales forecasting, and inventory optimization for retail businesses.',
      image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: ['ai', 'web'],
      tags: ['Analytics', 'AI Insights', 'Retail', 'Dashboard'],
      technologies: ['Python', 'React', 'D3.js', 'PostgreSQL', 'AWS'],
      results: [
        '30% improvement in inventory turnover',
        'Real-time sales tracking',
        'Predictive analytics with 92% accuracy',
        'Multi-location support'
      ]
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category.includes(activeFilter));

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how we've helped businesses transform their operations with 
              innovative AI solutions and comprehensive digital services.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-8 w-8" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProject(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {selectedProject.longDescription}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Results</h3>
                  <ul className="space-y-2">
                    {selectedProject.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold text-lg shadow-lg"
          >
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;