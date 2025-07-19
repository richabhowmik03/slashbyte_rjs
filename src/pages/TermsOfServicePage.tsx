import React from 'react';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const TermsOfServicePage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Scale className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These terms govern your use of SlashByte's services and website. 
              Please read them carefully before using our services.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Agreement */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 text-blue-600 mr-3" />
                Agreement to Terms
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed">
                  By accessing and using SlashByte's website (slashbyte.org) and services, you accept and agree 
                  to be bound by the terms and provision of this agreement. If you do not agree to abide by the 
                  above, please do not use this service.
                </p>
              </div>
            </div>

            {/* Services Description */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Solutions</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• AI Chatbots (Voice & Text)</li>
                    <li>• RAG Document Systems</li>
                    <li>• AI-Powered Applications</li>
                    <li>• Custom AI Integration</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Digital Development</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Website Development</li>
                    <li>• Mobile Applications</li>
                    <li>• E-commerce Platforms</li>
                    <li>• UI/UX Design</li>
                  </ul>
                </div>

                <div className="border border-gray-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Content & Marketing</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Content Creation</li>
                    <li>• Social Media Management</li>
                    <li>• SEO & Digital Marketing</li>
                    <li>• Brand Strategy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* User Responsibilities */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Responsibilities</h2>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    You Must
                  </h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Provide accurate and complete information</li>
                    <li>• Use our services for lawful purposes only</li>
                    <li>• Respect intellectual property rights</li>
                    <li>• Maintain confidentiality of login credentials</li>
                    <li>• Comply with all applicable laws and regulations</li>
                    <li>• Pay for services as agreed upon</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-red-900 mb-3 flex items-center">
                    <XCircle className="h-5 w-5 mr-2" />
                    You Must Not
                  </h3>
                  <ul className="space-y-2 text-red-800">
                    <li>• Use our services for illegal or harmful activities</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                    <li>• Upload malicious content or malware</li>
                    <li>• Violate any third-party rights</li>
                    <li>• Reverse engineer our AI models or proprietary technology</li>
                    <li>• Share access credentials with unauthorized parties</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Terms</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Project-Based Services</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• 50% deposit required to start work</li>
                    <li>• Remaining balance due upon completion</li>
                    <li>• Payment terms: Net 15 days</li>
                    <li>• Late fees may apply after 30 days</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ongoing Services</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Monthly billing in advance</li>
                    <li>• Auto-renewal unless cancelled</li>
                    <li>• 30-day notice required for cancellation</li>
                    <li>• Refunds subject to service agreement</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Our IP Rights</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    SlashByte retains all rights to our proprietary AI models, algorithms, methodologies, 
                    and any pre-existing intellectual property. Our tools, frameworks, and general knowledge 
                    remain our property.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your IP Rights</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    You retain ownership of your business data, content, and any custom developments 
                    specifically created for your project. We will not use your confidential business 
                    information for other clients.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Shared Rights</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Custom solutions developed for your project become your property upon full payment. 
                    However, we may retain the right to use general methodologies and non-confidential 
                    learnings for future projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Data and Privacy */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Shield className="h-6 w-6 text-green-600 mr-3" />
                Data Handling and Privacy
              </h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed mb-4">
                  We are committed to protecting your data and privacy. Our data handling practices include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Secure data encryption and storage</li>
                    <li>• Limited access on need-to-know basis</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Compliance with data protection laws</li>
                  </ul>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Data backup and recovery procedures</li>
                    <li>• Client data segregation</li>
                    <li>• Secure deletion upon request</li>
                    <li>• Transparent privacy practices</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Service Availability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Availability</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-3">Service Level Expectations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-yellow-800 text-sm">
                    <li>• 99.5% uptime for hosted services</li>
                    <li>• 24-48 hour response time for support</li>
                    <li>• Scheduled maintenance with advance notice</li>
                    <li>• Emergency support for critical issues</li>
                  </ul>
                  <ul className="space-y-2 text-yellow-800 text-sm">
                    <li>• Regular backups and monitoring</li>
                    <li>• Disaster recovery procedures</li>
                    <li>• Performance optimization</li>
                    <li>• Proactive issue resolution</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Limitations and Disclaimers */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                Limitations and Disclaimers
              </h2>
              
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Service Limitations</h3>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>• AI services may have accuracy limitations</li>
                    <li>• Performance depends on data quality and complexity</li>
                    <li>• Third-party service dependencies may affect availability</li>
                    <li>• Results may vary based on implementation and usage</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-900 mb-3">Liability Limitations</h3>
                  <p className="text-red-800 text-sm leading-relaxed">
                    SlashByte's liability is limited to the amount paid for services. We are not liable for 
                    indirect, incidental, or consequential damages. Services are provided "as is" without 
                    warranties beyond those explicitly stated in service agreements.
                  </p>
                </div>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Termination</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">By You</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• 30-day written notice for ongoing services</li>
                    <li>• Immediate termination for project-based work</li>
                    <li>• Payment due for completed work</li>
                    <li>• Data export assistance provided</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">By Us</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Immediate termination for terms violation</li>
                    <li>• 30-day notice for business reasons</li>
                    <li>• Refund of unused prepaid services</li>
                    <li>• Reasonable transition assistance</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed">
                  These terms are governed by the laws of India. Any disputes will be resolved through 
                  binding arbitration in accordance with Indian arbitration laws. The courts of India 
                  shall have exclusive jurisdiction over any matters not subject to arbitration.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-700"><strong>Email:</strong> legal@slashbyte.org</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +91 (600) 991-5076</p>
                  <p className="text-gray-700"><strong>Address:</strong> SlashByte, India</p>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms Updates</h2>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to modify these terms at any time. Material changes will be 
                  communicated via email or website notice at least 30 days in advance. Continued use 
                  of our services after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;