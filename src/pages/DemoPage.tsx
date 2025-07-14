import React, { useState } from 'react';
import { Play, FileText, MessageSquare, Mic, Upload, Send, Bot, X, RefreshCw } from 'lucide-react';

const DemoPage = () => {
  const [activeDemo, setActiveDemo] = useState('chatbot');
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [ragReady, setRagReady] = useState(false);
  const [ragMessages, setRagMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);

  // Backend API URL - adjust if your backend runs on a different port
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://slashbyte-rjs.onrender.com';

  const demos = [
    {
      id: 'chatbot',
      title: 'AI Chatbot Demo',
      description: 'Experience our intelligent chatbot in action',
      icon: MessageSquare
    },
    {
      id: 'rag',
      title: 'RAG Document Q&A',
      description: 'Upload a document and ask questions about it',
      icon: FileText
    },
    {
      id: 'voice',
      title: 'Voice AI Assistant',
      description: 'Try our voice-powered AI interface',
      icon: Mic
    }
  ];

  const sampleQuestions = [
    "What services does SlashByte offer?",
    "How can AI help my business?",
    "What's the difference between a chatbot and RAG system?",
    "Can you help with mobile app development?"
  ];

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: messageToSend }]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      if (messageToSend.toLowerCase().includes('services')) {
        botResponse = 'SlashByte offers AI solutions (chatbots, RAG pipelines, AI-powered apps) and digital services (web development, UI/UX design, digital marketing). We specialize in combining cutting-edge AI with traditional digital services.';
      } else if (messageToSend.toLowerCase().includes('ai help')) {
        botResponse = 'AI can help your business in many ways: automate customer support with chatbots, enable instant document search with RAG systems, provide data insights, and enhance user experiences. We can assess your specific needs and recommend the best AI solutions.';
      } else if (messageToSend.toLowerCase().includes('chatbot') && messageToSend.toLowerCase().includes('rag')) {
        botResponse = 'Great question! A chatbot provides conversational interfaces for customer interaction, while a RAG (Retrieval-Augmented Generation) system searches through your documents to answer specific questions. Both can work together for comprehensive AI solutions.';
      } else if (messageToSend.toLowerCase().includes('mobile app')) {
        botResponse = 'Yes! We develop mobile apps for iOS and Android, including AI-powered features like voice assistants, recommendation engines, and intelligent user interfaces. We use React Native and native development approaches.';
      } else {
        botResponse = 'That\'s an interesting question! Our team would love to discuss your specific needs in detail. Would you like to schedule a consultation to explore how our AI and digital solutions can help your business?';
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 1000);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setUploadedFile(file.name);
          setRagReady(true);
          console.log('Upload successful:', result);
        } else {
          const error = await response.json();
          alert(`Upload failed: ${error.detail}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('Upload failed. Make sure the backend is running on http://localhost:8000');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRagQuestion = async (question: string) => {
    if (!ragReady) {
      alert('Please upload a document first');
      return;
    }

    // Add user question to messages
    setRagMessages(prev => [...prev, { type: 'user', content: question }]);
    setIsAsking(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Add bot response to messages
          setRagMessages(prev => [...prev, { type: 'bot', content: result.answer }]);
          return result.answer;
        } else {
          throw new Error(result.error || 'Unknown error');
        }
      } else {
        throw new Error('Failed to get response from server');
      }
    } catch (error) {
      console.error('Question error:', error);
      const errorMessage = `Error: ${error.message}. Make sure the backend is running.`;
      setRagMessages(prev => [...prev, { type: 'bot', content: errorMessage }]);
      return errorMessage;
    } finally {
      setIsAsking(false);
    }
  };

  const handleClearDocument = () => {
    // Reset all document-related state
    setUploadedFile(null);
    setRagReady(false);
    setRagMessages([]);
    setIsAsking(false);
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Interactive Demo Zone</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our AI solutions firsthand with these interactive demonstrations
          </p>
        </div>
      </section>

      {/* Demo Selection */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    activeDemo === demo.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`h-8 w-8 mb-4 ${
                    activeDemo === demo.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{demo.title}</h3>
                  <p className="text-gray-600">{demo.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeDemo === 'chatbot' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Chatbot Demo</h2>
                <p className="text-gray-600">Try our intelligent chatbot by typing a message or clicking on sample questions</p>
              </div>
              
              {/* Sample Questions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Try these sample questions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Interface */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-white rounded-lg shadow-sm mb-4">
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          {message.type === 'bot' && <Bot className="h-4 w-4 inline mr-2" />}
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'rag' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">RAG Document Q&A Demo</h2>
                <p className="text-gray-600">Upload a document and ask questions about its content</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                {!uploadedFile ? (
                  <div className="text-center py-12">
                    <Upload className={`h-16 w-16 mx-auto mb-4 ${isUploading ? 'text-blue-500 animate-spin' : 'text-gray-400'}`} />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload a Document</h3>
                    <p className="text-gray-600 mb-6">Supported formats: PDF, DOCX, TXT (Max 10MB for demo)</p>
                    <label className={`px-6 py-3 rounded-lg transition-colors cursor-pointer inline-block ${
                      isUploading 
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {isUploading ? 'Uploading...' : 'Choose File'}
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                ) : (
                  <div>
                    <div className={`border rounded-lg p-4 mb-6 ${
                      ragReady 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-yellow-50 border-yellow-200'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <FileText className={`h-5 w-5 mr-2 ${
                          ragReady ? 'text-green-600' : 'text-yellow-600'
                        }`} />
                        <span className={ragReady ? 'text-green-800' : 'text-yellow-800'}>
                          Document uploaded: {uploadedFile} {ragReady ? '(Ready for questions)' : '(Processing...)'}
                        </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handleClearDocument}
                            className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors duration-200"
                            title="Clear document and start over"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Clear
                          </button>
                          <button
                            onClick={() => {
                              const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                              if (fileInput) fileInput.click();
                            }}
                            className="flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                            title="Upload a different document"
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* RAG Chat Interface */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                      {/* Chat Header */}
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                        <div className="flex items-center">
                          <div className="flex items-center">
                          <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-3">
                            <FileText className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">Document Q&A Assistant</h3>
                            <p className="text-purple-100 text-sm">Ask questions about: {uploadedFile}</p>
                          </div>
                          </div>
                          <button
                            onClick={handleClearDocument}
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors duration-200"
                            title="Clear document and start over"
                          >
                            <X className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>

                      {/* Sample Questions */}
                      {ragMessages.length === 0 && (
                        <div className="p-4 bg-gray-50 border-b">
                          <h4 className="text-sm font-medium text-gray-700 mb-3">💡 Try these sample questions:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <button 
                              onClick={() => handleRagQuestion("What is the main topic of this document?")}
                              disabled={!ragReady || isAsking}
                              className="text-left p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200 text-sm"
                            >
                              📄 What is the main topic?
                            </button>
                            <button 
                              onClick={() => handleRagQuestion("Summarize the key points")}
                              disabled={!ragReady || isAsking}
                              className="text-left p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200 text-sm"
                            >
                              📝 Summarize key points
                            </button>
                            <button 
                              onClick={() => handleRagQuestion("Are there any action items mentioned?")}
                              disabled={!ragReady || isAsking}
                              className="text-left p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200 text-sm"
                            >
                              ✅ Any action items?
                            </button>
                            <button 
                              onClick={() => handleRagQuestion("What are the most important details?")}
                              disabled={!ragReady || isAsking}
                              className="text-left p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed border border-blue-200 text-sm"
                            >
                              ⭐ Important details?
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Chat Messages */}
                      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {ragMessages.length === 0 ? (
                          <div className="text-center py-8">
                            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500">Start by asking a question about your document above, or type your own question below.</p>
                          </div>
                        ) : (
                          ragMessages.map((message, index) => (
                            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                                message.type === 'user'
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                                  : 'bg-white text-gray-900 border border-gray-200 rounded-bl-md'
                              }`}>
                                {message.type === 'bot' && (
                                  <div className="flex items-center mb-2">
                                    <Bot className="h-4 w-4 text-purple-600 mr-2" />
                                    <span className="text-xs font-medium text-purple-600">AI Assistant</span>
                                  </div>
                                )}
                                <div className={`${message.type === 'user' ? 'text-white' : 'text-gray-800'} leading-relaxed`}>
                                  {message.content}
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                        
                        {/* Typing indicator */}
                        {isAsking && (
                          <div className="flex justify-start">
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-200 max-w-xs">
                              <div className="flex items-center">
                                <Bot className="h-4 w-4 text-purple-600 mr-2" />
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                  <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Input Area */}
                      <div className="p-4 bg-white border-t border-gray-200">
                        <RagQuestionInput 
                          onAsk={handleRagQuestion}
                          disabled={!ragReady}
                          isAsking={isAsking}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Hidden file input for "Change" button */}
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
                id="change-file-input"
              />
            </div>
          )}

          {activeDemo === 'voice' && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Voice AI Assistant Demo</h2>
                <p className="text-gray-600">Click to start voice interaction or use the microphone button</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Mic className="h-16 w-16 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Voice Assistant Ready</h3>
                <p className="text-gray-600 mb-8">Click the microphone to start speaking or try the sample commands below</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-gray-900 mb-2">Sample Commands:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>"Tell me about SlashByte services"</li>
                      <li>"How can AI help my business?"</li>
                      <li>"Schedule a consultation"</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>Natural language processing</li>
                      <li>Multi-language support</li>
                      <li>Real-time responses</li>
                    </ul>
                  </div>
                </div>
                
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold flex items-center mx-auto">
                  <Play className="mr-2 h-5 w-5" />
                  Start Voice Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Schedule Demo CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Want a Personalized Demo?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a one-on-one demo session with our team to see how our AI solutions can be customized for your specific business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Schedule Personal Demo
            </button>
            <button className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors font-semibold border-2 border-blue-500">
              Contact Sales Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Component for RAG question input
const RagQuestionInput = ({ onAsk, disabled, isAsking }: {
  onAsk: (question: string) => Promise<string>;
  disabled: boolean;
  isAsking: boolean;
}) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || disabled || isAsking) return;

    await onAsk(question);
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        disabled={disabled || isAsking}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed bg-gray-50 focus:bg-white transition-colors"
      />
      <button 
        type="submit"
        disabled={disabled || isAsking || !question.trim()}
        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-xl"
      >
        {isAsking ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          </>
        ) : (
          <Send className="h-4 w-4" />
        )}
      </button>
    </form>
  );
};

export default DemoPage;