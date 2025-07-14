import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp,
  Mail,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Globe,
  Star
} from 'lucide-react';

const CareersPage = () => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const jobPosting = {
    id: 'marketing-lead-gen-partner',
    title: 'Marketing & Lead Generation Partner',
    type: 'Commission-Based',
    location: 'Remote | Work on Your Own Time',
    department: 'Marketing & Sales',
    posted: '2024-01-15',
    description: "As a Growth Partner, you'll actively help SlashByte connect with both businesses and students. Your role will involve driving conversations, building relationships, and closing deals in two exciting sectors—AI solutions and EdTech certifications.",
    responsibilities: [
      {
        category: 'Lead Generation & Marketing',
        tasks: [
          'Find B2B Leads - Identify and reach out to startups, SMBs, and tech-enabled companies',
          'Target companies needing AI Chatbots, AI App Deployment, Web Development & Digital Solutions',
          'Build and maintain a lead funnel and follow-up pipeline'
        ]
      },
      {
        category: 'Promote Certification Programs',
        tasks: [
          'Connect with colleges, student communities, training & placement officers',
          'Enroll students in SlashByte\'s certification programs (target: 3rd & 4th-year students)',
          'Form collaborations with training centers, tech clubs, or student groups'
        ]
      },
      {
        category: 'Outreach & Conversion',
        tasks: [
          'Use LinkedIn, WhatsApp, Email, Calls, or Personal Networking to connect with leads',
          'Pitch services clearly and set up calls or close deals directly',
          'Build partnerships to scale student enrollments'
        ]
      }
    ],
    benefits: [
      'Performance-Driven Earning - Get paid per client or student you convert',
      'High commission for B2B deals + good incentives for student enrollments',
      'No earning cap - the more you close, the more you earn',
      '100% remote work with no fixed hours',
      'Dual market exposure in AI-tech services and EdTech certification',
      'Career growth opportunity with hands-on sales & marketing experience',
      'Network with founders, tech teams, and placement heads'
    ],
    requirements: [
      'Good communication & persuasion skills',
      'Experience in LinkedIn outreach, cold emailing, or community networking (plus)',
      'Hustle mindset with result-oriented focus',
      'Confidence in networking, pitching, and converting leads'
    ],
    idealCandidates: [
      'Freelancers looking for side income',
      'Students with good networks',
      'Freshers interested in marketing & lead generation',
      'Anyone confident in networking, pitching, and converting leads'
    ],
    paymentStructure: {
      type: 'Incentive Only (Commission-Based)',
      details: [
        'No fixed salary',
        'Paid per conversion (business clients or student enrollments)',
        'Commission details discussed during selection process'
      ]
    }
  };

  const companyValues = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable outcomes for our clients and team members.'
    },
    {
      icon: Users,
      title: 'Collaborative Growth',
      description: 'We believe in growing together and supporting each other\'s success.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation First',
      description: 'We stay at the forefront of AI and digital technology trends.'
    },
    {
      icon: Globe,
      title: 'Remote-First',
      description: 'We embrace flexible work arrangements and global talent.'
    }
  ];

  const handleApply = () => {
    const subject = encodeURIComponent(`Application for ${jobPosting.title} Position`);
    const body = encodeURIComponent(`Dear SlashByte Team,

I am interested in applying for the ${jobPosting.title} position.

Please find my details below:

Name: [Your Name]
LinkedIn Profile: [Your LinkedIn URL]
Experience: [Brief description of relevant experience]
Why I'm a good fit: [Explain why you're suitable for this role]

I look forward to hearing from you.

Best regards,
[Your Name]`);
    
    window.location.href = `mailto:careers@slashbyte.org?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Current Job Openings
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore exciting opportunities to grow your career with SlashByte. 
              We're looking for talented individuals to join our growing team.
            </p>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Job Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {jobPosting.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {jobPosting.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {jobPosting.type}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {jobPosting.department}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleApply}
                  className="mt-4 lg:mt-0 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Apply Now
                </button>
              </div>

              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                {jobPosting.description}
              </p>

              {/* Job Details */}
              <div className="space-y-8">
                {/* Responsibilities */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">What You'll Do</h4>
                  <div className="space-y-6">
                    {jobPosting.responsibilities.map((section, index) => (
                      <div key={index}>
                        <h5 className="font-semibold text-gray-800 mb-3">{section.category}</h5>
                        <ul className="space-y-2">
                          {section.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">What You'll Get</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobPosting.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h4>
                  <ul className="space-y-2">
                    {jobPosting.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal Candidates */}
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Who Can Apply?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobPosting.idealCandidates.map((candidate, index) => (
                      <div key={index} className="flex items-start">
                        <Users className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{candidate}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Structure */}
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-6 h-6 text-blue-600 mr-2" />
                    Payment Structure
                  </h4>
                  <p className="font-semibold text-blue-800 mb-3">{jobPosting.paymentStructure.type}</p>
                  <ul className="space-y-2">
                    {jobPosting.paymentStructure.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Apply Section */}
              <div className="mt-12 bg-gray-50 p-8 rounded-xl text-center">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h4>
                <p className="text-gray-600 mb-6">
                  Send your resume, LinkedIn profile, or a short note explaining why you're a good fit.
                </p>
                <button
                  onClick={handleApply}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center mx-auto"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Apply to careers@slashbyte.org
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CareersPage;