import React from 'react';
import { ArrowLeft, Save, Undo, Redo, Plus, Grid2x2 as Grid, Type, Image } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PanelEditor: React.FC = () => {
  const { setCurrentView, currentProject } = useApp();

  const tools = [
    { icon: Grid, name: 'Panel', active: true },
    { icon: Type, name: 'Text', active: false },
    { icon: Image, name: 'Image', active: false },
    { icon: Plus, name: 'Add', active: false },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-manga-gray" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-manga-black">
              {currentProject ? currentProject.title : 'Panel Editor'}
            </h1>
            <p className="text-manga-lightgray">Create and edit manga panels</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Undo size={18} className="text-manga-gray" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Redo size={18} className="text-manga-gray" />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-manga-red text-white rounded-lg hover:bg-manga-darkred transition-colors">
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
      </div>

      <div className="flex gap-4 h-[calc(100vh-200px)]">
        {/* Tools Panel */}
        <div className="w-16 bg-white rounded-xl shadow-panel p-2 space-y-2">
          {tools.map((tool, index) => (
            <button
              key={index}
              className={`w-full p-3 rounded-lg transition-colors ${
                tool.active 
                  ? 'bg-manga-red text-white' 
                  : 'text-manga-gray hover:bg-gray-100'
              }`}
            >
              <tool.icon size={20} />
            </button>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white rounded-xl shadow-panel p-6">
          <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Grid size={48} className="text-manga-lightgray mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-manga-black mb-2">
                Start Creating Your Manga
              </h3>
              <p className="text-manga-lightgray">
                Use the tools on the left to add panels, text, and images
              </p>
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-64 bg-white rounded-xl shadow-panel p-4">
          <h3 className="font-semibold text-manga-black mb-4">Properties</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-manga-gray mb-2">
                Panel Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Width"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-manga-red/20"
                />
                <input
                  type="number"
                  placeholder="Height"
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-manga-red/20"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-manga-gray mb-2">
                Border Style
              </label>
              <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-manga-red/20">
                <option>Solid</option>
                <option>Dashed</option>
                <option>None</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-manga-gray mb-2">
                Background
              </label>
              <div className="flex space-x-2">
                <input
                  type="color"
                  className="w-12 h-8 border border-gray-200 rounded cursor-pointer"
                  defaultValue="#ffffff"
                />
                <input
                  type="text"
                  placeholder="#ffffff"
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-manga-red/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelEditor;