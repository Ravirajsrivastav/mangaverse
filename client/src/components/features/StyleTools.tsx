import React from 'react';
import { ArrowLeft, Palette, Brush, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const StyleTools: React.FC = () => {
  const { setCurrentView } = useApp();

  const tools = [
    {
      icon: Palette,
      name: 'Color Palette Generator',
      description: 'Create harmonious color schemes for your manga',
      features: ['Complementary Colors', 'Mood-based Palettes', 'Character Color Schemes'],
    },
    {
      icon: Brush,
      name: 'Brush Styles',
      description: 'Customize drawing tools and effects',
      features: ['Ink Brushes', 'Texture Brushes', 'Special Effects'],
    },
    {
      icon: Layers,
      name: 'Layer Management',
      description: 'Organize your artwork with advanced layering',
      features: ['Layer Groups', 'Blend Modes', 'Opacity Control'],
    },
    {
      icon: Sparkles,
      name: 'Style Transfer',
      description: 'Apply different art styles to your work',
      features: ['Classic Manga', 'Modern Digital', 'Watercolor Effect'],
    },
  ];

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
          <h1 className="text-3xl font-bold text-manga-black">Style Tools</h1>
          <p className="text-manga-lightgray mt-1">Enhance your manga with professional styling tools</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-panel hover:shadow-panel-hover transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-manga-red/10 rounded-lg group-hover:bg-manga-red/20 transition-colors">
                <tool.icon size={24} className="text-manga-red" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-manga-black group-hover:text-manga-red transition-colors mb-2">
                  {tool.name}
                </h3>
                <p className="text-manga-lightgray mb-4">
                  {tool.description}
                </p>
                <div className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-manga-red rounded-full"></div>
                      <span className="text-sm text-manga-gray">{feature}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 w-full py-2 text-center text-sm font-medium text-manga-red hover:bg-manga-red hover:text-white rounded-lg border border-manga-red/20 transition-all duration-300">
                  Open Tool
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-panel">
        <h2 className="text-xl font-semibold text-manga-black mb-4">Quick Style Presets</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Classic Manga', 'Modern Digital', 'Watercolor', 'Sketch Style'].map((preset, index) => (
            <button
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-manga-red/30 hover:bg-manga-red/5 transition-all duration-200 text-center"
            >
              <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-2"></div>
              <span className="text-sm font-medium text-manga-black">{preset}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleTools;