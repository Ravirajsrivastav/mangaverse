import React from 'react';
import { Palette, Type, Image, Layers, Sparkles, Camera } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const CreationTools: React.FC = () => {
  const { setCurrentView } = useApp();

  const tools = [
    {
      icon: Palette,
      name: 'Character Designer',
      description: 'AI-powered character creation and customization',
      features: ['Face Generator', 'Body Proportions', 'Clothing Design'],
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      action: () => setCurrentView('characters'),
    },
    {
      icon: Layers,
      name: 'Panel Layout',
      description: 'Dynamic panel arrangements and compositions',
      features: ['Grid Templates', 'Custom Shapes', 'Flow Control'],
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      action: () => setCurrentView('panel-editor'),
    },
    {
      icon: Type,
      name: 'Speech Bubbles',
      description: 'Professional dialogue and sound effect tools',
      features: ['Bubble Styles', 'Font Library', 'Effects'],
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      action: () => setCurrentView('story-builder'),
    },
    {
      icon: Camera,
      name: 'Scene Builder',
      description: 'Create backgrounds and environments',
      features: ['3D Environments', 'Perspective Tools', 'Lighting'],
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      action: () => setCurrentView('style-tools'),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-panel animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-manga-black">Creation Tools</h2>
        <div className="flex items-center space-x-1 text-manga-red">
          <Sparkles size={16} />
          <span className="text-sm font-medium">AI Enhanced</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div
            key={tool.name}
            className="border border-gray-200 rounded-lg p-5 hover:border-manga-red/30 hover:shadow-md transition-all duration-300 group cursor-pointer animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg ${tool.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon size={24} className={tool.textColor} />
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-manga-black group-hover:text-manga-red transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-manga-lightgray mt-1 mb-3">
                  {tool.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {tool.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2 py-1 bg-gray-100 text-xs text-manga-lightgray rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              onClick={tool.action}
              className="w-full mt-4 py-2 text-center text-sm font-medium text-manga-red hover:bg-manga-red hover:text-white rounded-lg border border-manga-red/20 transition-all duration-300"
            >
              Launch Tool
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreationTools;