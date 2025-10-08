import React from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const WelcomeSection: React.FC = () => {
  const { setCurrentView } = useApp();

  const handleStartProject = () => {
    setCurrentView('create');
  };

  const handleViewGallery = () => {
    setCurrentView('gallery');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-manga-red via-manga-darkred to-manga-red rounded-2xl p-8 text-white animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
        <div className="absolute inset-0 bg-white rounded-full transform translate-x-20 -translate-y-20"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles size={24} className="text-yellow-300" />
          <span className="text-yellow-300 font-medium">Welcome back!</span>
        </div>
        
        <h1 className="text-4xl font-heading font-bold mb-3">
          Ready to Create Amazing Manga?
        </h1>
        
        <p className="text-xl opacity-90 mb-6 max-w-2xl">
          Transform your stories into stunning visual narratives with AI-powered tools designed for manga creators.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleStartProject}
            className="bg-white text-manga-red px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Start New Project
          </button>
          
          <button 
            onClick={handleViewGallery}
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-manga-red transition-all duration-300"
          >
            View Gallery
          </button>
        </div>
        
        <div className="flex items-center space-x-4 mt-8 text-sm">
          <div className="flex items-center space-x-1">
            <TrendingUp size={16} />
            <span>+15% creativity boost this week</span>
          </div>
          <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
          <span>3 new AI features available</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;