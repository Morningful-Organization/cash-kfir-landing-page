import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { chatbotService, ChatbotRequestData } from '../../../shared/services/api/chatbot';
import { useAnalytics } from '../../../shared/hooks';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
}

const TOPICS = [
  'General contact',
  'Feedback',
  'Demo request',
  'Technical support'
];

const getTopicQuestions = (topic: string): string[] => {
  switch (topic) {
    case 'General contact':
      return [
        'What would you like to discuss with our team?',
        'What\'s the best way for us to get in touch with you?',
        'Please provide your email address so we can follow up with you.'
      ];
    case 'Feedback':
      return [
        'We\'d love to hear your feedback! What would you like to share?',
        'How can we improve our cash flow management solution?',
        'Please provide your email address so we can follow up on your feedback.'
      ];
    case 'Demo request':
      return [
        'What specific aspects of our cash flow solution interest you most?',
        'What challenges are you currently facing with cash flow management?',
        'When would be the best time to schedule your personalized demo?',
        'Please provide your email address so we can schedule your demo.'
      ];
    case 'Technical support':
      return [
        'What technical issue are you experiencing?',
        'Have you tried any troubleshooting steps already?',
        'Please provide your email address so our support team can assist you.'
      ];
    default:
      return [
        'Please provide more details about how we can help you.',
        'What\'s the best way for our team to follow up with you?',
        'Please provide your email address so we can get in touch.'
      ];
  }
};

export const Chatbot: React.FC<ChatbotProps> = () => {
  const { trackCTAClick, trackFeatureInteraction } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [userResponses, setUserResponses] = useState<{ question: string; answer: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTopicSelection, setShowTopicSelection] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        addBotMessage(
          "Hi! I'm here to help you with your cash flow management needs. Please select a topic you'd like to discuss:"
        );
      }, 500);
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const message: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, message]);
      setIsTyping(false);
    }, 1000);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const handleTopicSelection = (topic: string) => {
    trackFeatureInteraction('chatbot', `topic_selected_${topic.toLowerCase().replace(/\s+/g, '_')}`);
    
    setSelectedTopic(topic);
    setShowTopicSelection(false);
    
    // Add user's topic selection as a message
    addUserMessage(`I'd like to discuss: ${topic}`);
    
    // Get questions for the selected topic
    const questions = getTopicQuestions(topic);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    
    // Ask the first question
    setTimeout(() => {
      addBotMessage(questions[0]);
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    addUserMessage(currentInput);
    
    // Save the response
    if (currentQuestionIndex < currentQuestions.length) {
      const newResponse = {
        question: currentQuestions[currentQuestionIndex],
        answer: currentInput
      };
      setUserResponses(prev => [...prev, newResponse]);
    }

    setCurrentInput('');
    
    // Move to next question or complete
    setTimeout(async () => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        addBotMessage(currentQuestions[currentQuestionIndex + 1]);
      } else if (!isComplete) {
        setIsComplete(true);
        
        // Prepare data for API request when conversation is complete
        const allResponses = [...userResponses, {
          question: currentQuestions[currentQuestionIndex],
          answer: currentInput
        }];
        
        const requestData: ChatbotRequestData = {
          chosenTopic: selectedTopic,
          question1: allResponses[0]?.question || '',
          question2: allResponses[1]?.question || '',
          question3: allResponses[2]?.question || '',
          question4: allResponses[3]?.question || undefined,
          answer1: allResponses[0]?.answer || '',
          answer2: allResponses[1]?.answer || '',
          answer3: allResponses[2]?.answer || '',
          answer4: allResponses[3]?.answer || undefined,
        };

        // Send to API
        try {
          const result = await chatbotService.submitChatbotRequest(requestData);
          
          if (result.success) {
            trackCTAClick('Chatbot Conversation Completed', 'chatbot');
            addBotMessage(
              "Perfect! Thank you for sharing your information with us. Our team has received your details and will be in touch soon to help you optimize your cash flow management. Have a great day!"
            );
          } else {
            console.error('Failed to submit chatbot request:', result.error);
            trackFeatureInteraction('chatbot', 'submission_failed');
            addBotMessage(
              "Thank you for sharing your information with us. We'll be in touch soon to help you optimize your cash flow management. Have a great day!"
            );
          }
        } catch (error) {
          console.error('Error submitting chatbot request:', error);
          trackFeatureInteraction('chatbot', 'submission_error');
          addBotMessage(
            "Thank you for sharing your information with us. We'll be in touch soon to help you optimize your cash flow management. Have a great day!"
          );
        }
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      trackFeatureInteraction('chatbot', 'opened');
    } else {
      trackFeatureInteraction('chatbot', 'closed');
    }
    
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 w-80 sm:w-96 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bot className="w-5 h-5" />
                  <span className="font-semibold">Cash Flow Assistant</span>
                </div>
                <button
                  onClick={toggleChat}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-white/90 mt-1">
                Let's optimize your cash flow management
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-gradient-to-r from-[#00d4ff] to-[#0099cc] text-white'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && (
                        <Bot className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00d4ff]" />
                      )}
                      {!message.isBot && (
                        <User className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/80" />
                      )}
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 px-3 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-[#00d4ff]" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Topic Selection */}
              {showTopicSelection && messages.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <div className="grid grid-cols-1 gap-2">
                    {TOPICS.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicSelection(topic)}
                        className="text-left p-3 bg-white border border-gray-200 hover:border-[#00d4ff] hover:bg-[#00d4ff]/5 rounded-lg transition-all duration-200 text-sm font-medium text-gray-700 hover:text-[#00d4ff]"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {!isComplete && !showTopicSelection && (
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your response..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00d4ff] focus:border-transparent"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!currentInput.trim() || isTyping}
                    className="bg-gradient-to-r from-[#00d4ff] to-[#0099cc] hover:from-[#00b8e6] hover:to-[#0088bb] disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-all duration-200"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="w-14 h-14 bg-gradient-to-r from-[#00d4ff] to-[#0099cc] hover:from-[#00b8e6] hover:to-[#0088bb] rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-200"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification Badge */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"
        />
      )}
    </div>
  );
};
