import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Lightbulb, ArrowRight } from 'lucide-react';

const AboutPreview = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              We are humans and we love to solve problems
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              At SlashByte, we started as two introverted tech enthusiasts working from our bedrooms. 
              From that humble beginning in 2018, we've grown into a dynamic team. Our journey has been 
              about solving problems, learning, and growing together.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              In 2022, SlashByte was officially founded, and we're now applying our skills to innovate 
              in the healthcare sector. We believe that with time, dedication, and collaboration, 
              we can overcome any challenge—and we're just getting started.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Human-Centered</h3>
              <p className="text-gray-600 text-sm">We prioritize understanding your unique challenges and crafting personalized solutions.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="bg-green-100 p-3 rounded-lg w-fit mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Problem Solvers</h3>
              <p className="text-gray-600 text-sm">Every challenge is an opportunity for us to innovate and deliver exceptional results.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg sm:col-span-2">
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation First</h3>
              <p className="text-gray-600 text-sm">We stay at the forefront of technology, especially in AI and healthcare innovation, to provide cutting-edge solutions.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;