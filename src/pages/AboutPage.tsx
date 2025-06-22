import React from 'react';
import { Users, Award, Target, Heart, Lightbulb, Clock } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Human-Centered Approach',
      description: 'We believe technology should serve people, not the other way around. Every solution we create puts human needs first.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation & Learning',
      description: 'We stay curious and embrace continuous learning to deliver cutting-edge solutions that push boundaries.'
    },
    {
      icon: Target,
      title: 'Problem-Solving Focus',
      description: 'Every challenge is an opportunity for us to innovate and deliver exceptional results that exceed expectations.'
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description: 'We work closely with our clients as partners, ensuring transparent communication and shared success.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Started as two introverted tech enthusiasts working from bedrooms, driven by passion for solving problems.'
    },
    {
      year: '2022',
      title: 'Official Launch',
      description: 'SlashByte was officially founded, marking our transition from passion project to professional agency.'
    },
    {
      year: '2024',
      title: 'Healthcare Focus',
      description: 'Expanded our expertise into healthcare innovation, developing AI solutions for medical applications.'
    },
    {
      year: '2025',
      title: 'AI Revolution',
      description: 'Leading the charge in AI integration, helping businesses transform with intelligent automation.'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About SlashByte
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We build. We design. We code. We create. We figure out everything.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  We are humans and we love to solve problems
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  At SlashByte, we started as two introverted tech enthusiasts working from our bedrooms. 
                  From that humble beginning in 2018, we've grown into a dynamic team. Our journey has been 
                  about solving problems, learning, and growing together.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  In 2022, SlashByte was officially founded, and we're now applying our skills to innovate 
                  in the healthcare sector. We believe that with time, dedication, and collaboration, 
                  we can overcome any challenge—and we're just getting started.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Team collaboration"
                  className="rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we work with our clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="bg-blue-100 p-3 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to healthcare innovation - here's how we've grown.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Choose SlashByte?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Proven Experience
              </h3>
              <p className="text-gray-600">
                Years of experience in both AI innovation and traditional digital services, 
                with a track record of successful projects across industries.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Lightbulb className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Cutting-Edge Expertise
              </h3>
              <p className="text-gray-600">
                We stay at the forefront of AI and digital technology, ensuring you get 
                the most innovative and effective solutions available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Agile & Client-Centric
              </h3>
              <p className="text-gray-600">
                Our agile approach and client-first mindset ensure fast delivery, 
                transparent communication, and solutions tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;