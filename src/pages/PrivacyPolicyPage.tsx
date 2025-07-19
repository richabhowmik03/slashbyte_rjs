import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Phone } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how SlashByte collects, 
              uses, and protects your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last updated: January 15, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-6 w-6 text-blue-600 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-600 leading-relaxed">
                SlashByte ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our 
                website slashbyte.org, use our services, or interact with our AI solutions.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Name and contact information (email, phone number)</li>
                    <li>• Company name and job title</li>
                    <li>• Project requirements and business needs</li>
                    <li>• Communication preferences</li>
                    <li>• Calendar and scheduling information</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• IP address and browser information</li>
                    <li>• Device type and operating system</li>
                    <li>• Website usage patterns and analytics</li>
                    <li>• Cookies and similar tracking technologies</li>
                    <li>• Chatbot interaction data</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Service-Related Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Documents uploaded to our RAG systems</li>
                    <li>• AI chatbot training data and conversations</li>
                    <li>• Project files and development assets</li>
                    <li>• Performance metrics and usage statistics</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Service Delivery</h3>
                  <ul className="space-y-2 text-blue-800 text-sm">
                    <li>• Provide AI and digital solutions</li>
                    <li>• Process and respond to inquiries</li>
                    <li>• Schedule and conduct consultations</li>
                    <li>• Deliver project outcomes</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Communication</h3>
                  <ul className="space-y-2 text-green-800 text-sm">
                    <li>• Send project updates and notifications</li>
                    <li>• Provide customer support</li>
                    <li>• Share relevant service information</li>
                    <li>• Send marketing communications (with consent)</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Improvement</h3>
                  <ul className="space-y-2 text-purple-800 text-sm">
                    <li>• Enhance our AI models and services</li>
                    <li>• Analyze usage patterns</li>
                    <li>• Improve website functionality</li>
                    <li>• Develop new features</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3">Legal Compliance</h3>
                  <ul className="space-y-2 text-orange-800 text-sm">
                    <li>• Comply with legal obligations</li>
                    <li>• Protect our rights and interests</li>
                    <li>• Prevent fraud and abuse</li>
                    <li>• Maintain security and safety</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Security */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Lock className="h-6 w-6 text-green-600 mr-3" />
                Data Security
              </h2>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Encryption of data in transit and at rest</li>
                  <li>• Regular security audits and assessments</li>
                  <li>• Access controls and authentication</li>
                  <li>• Secure cloud infrastructure (AWS, Google Cloud)</li>
                  <li>• Regular backup and disaster recovery procedures</li>
                </ul>
              </div>
            </div>

            {/* Third-Party Services */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use trusted third-party services to enhance our offerings:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Google Services</h4>
                  <p className="text-sm text-gray-600">Calendar API, Analytics, Cloud Platform</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">EmailJS</h4>
                  <p className="text-sm text-gray-600">Email delivery and communication</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">OpenAI/Azure</h4>
                  <p className="text-sm text-gray-600">AI model processing and generation</p>
                </div>
                <div className="border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics Tools</h4>
                  <p className="text-sm text-gray-600">Website performance and user insights</p>
                </div>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-gray-600">
                    <li>• Access your personal data</li>
                    <li>• Correct inaccurate information</li>
                    <li>• Delete your personal data</li>
                    <li>• Restrict processing</li>
                  </ul>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Data portability</li>
                    <li>• Object to processing</li>
                    <li>• Withdraw consent</li>
                    <li>• File complaints with authorities</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We use cookies and similar technologies to improve your experience:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">Required for website functionality and security</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">Help us understand how visitors use our website</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Preference Cookies</h4>
                  <p className="text-sm text-gray-600">Remember your settings and preferences</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">hello@slashbyte.org</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">+91 (600) 991-5076</span>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-gray-700">Data Protection Officer: privacy@slashbyte.org</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Updates */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material 
                  changes by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;