import React, { useState } from 'react';
import { ArrowLeft, Wand as Wand2, Send, Sparkles, Image, Users, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const AIAssistant: React.FC = () => {
  const { setCurrentView } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI manga creation assistant. I can help you generate characters, create storylines, design panels, and much more. What would you like to create today?',
      timestamp: new Date(),
    }
  ]);

  const suggestions = [
    {
      icon: Users,
      title: 'Generate Character',
      description: 'Create a new character with AI',
      prompt: 'Help me create a main character for my manga',
    },
    {
      icon: Image,
      title: 'Design Scene',
      description: 'Generate background scenes',
      prompt: 'I need help designing a futuristic cityscape scene',
    },
    {
      icon: FileText,
      title: 'Story Ideas',
      description: 'Get plot suggestions',
      prompt: 'Give me some interesting plot ideas for a school romance manga',
    },
    {
      icon: Sparkles,
      title: 'Panel Layout',
      description: 'Optimize panel arrangements',
      prompt: 'How should I arrange panels for an action sequence?',
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: message,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'ai',
          content: 'That\'s a great idea! Let me help you with that. I can generate some concepts and provide detailed suggestions for your manga creation.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setMessage(prompt);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} className="text-manga-gray" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-manga-black">AI Assistant</h1>
          <p className="text-manga-lightgray mt-1">Get AI-powered help for your manga creation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-panel h-96 flex flex-col">
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-manga-red text-white'
                        : 'bg-gray-100 text-manga-black'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about manga creation..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-manga-red/20 focus:border-manga-red"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-manga-red text-white p-2 rounded-lg hover:bg-manga-darkred transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-panel">
            <div className="flex items-center space-x-2 mb-4">
              <Wand2 size={16} className="text-manga-red" />
              <h3 className="font-semibold text-manga-black">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.prompt)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-manga-red/30 hover:bg-manga-red/5 transition-all duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <suggestion.icon size={16} className="text-manga-red mt-1" />
                    <div>
                      <h4 className="text-sm font-medium text-manga-black">
                        {suggestion.title}
                      </h4>
                      <p className="text-xs text-manga-lightgray">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-manga-red/10 to-manga-red/5 rounded-xl p-4 border border-manga-red/20">
            <div className="flex items-center space-x-2 mb-2">
              <Sparkles size={16} className="text-manga-red" />
              <h3 className="font-semibold text-manga-black">Pro Tip</h3>
            </div>
            <p className="text-sm text-manga-gray">
              Be specific in your requests! The more details you provide, the better I can assist you with your manga creation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;