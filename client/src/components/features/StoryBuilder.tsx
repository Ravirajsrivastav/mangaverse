import React from 'react';
import { ArrowLeft, Plus, BookOpen, CreditCard as Edit, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const StoryBuilder: React.FC = () => {
  const { setCurrentView } = useApp();

  const chapters = [
    {
      id: 1,
      title: 'The Beginning',
      pages: 12,
      status: 'completed',
      summary: 'Our hero discovers their hidden powers in a moment of crisis.',
    },
    {
      id: 2,
      title: 'First Challenge',
      pages: 8,
      status: 'in-progress',
      summary: 'The first major obstacle tests our protagonist\'s resolve.',
    },
    {
      id: 3,
      title: 'New Allies',
      pages: 0,
      status: 'planned',
      summary: 'Meeting companions who will join the journey.',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <h1 className="text-3xl font-bold text-manga-black">Story Builder</h1>
          <p className="text-manga-lightgray mt-1">Plan and organize your manga storyline</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-panel">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-manga-black">Story Chapters</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-manga-red text-white rounded-lg hover:bg-manga-darkred transition-colors">
            <Plus size={16} />
            <span>New Chapter</span>
          </button>
        </div>

        <div className="space-y-4">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-manga-red/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen size={16} className="text-manga-red" />
                    <h3 className="font-semibold text-manga-black">
                      Chapter {index + 1}: {chapter.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(chapter.status)}`}>
                      {chapter.status}
                    </span>
                  </div>
                  <p className="text-manga-lightgray text-sm mb-3">
                    {chapter.summary}
                  </p>
                  <div className="text-xs text-manga-lightgray">
                    {chapter.pages} pages
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Edit size={16} className="text-manga-gray" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-panel">
          <h3 className="font-semibold text-manga-black mb-4">Story Outline</h3>
          <textarea
            placeholder="Write your story outline here..."
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-manga-red/20 focus:border-manga-red"
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-panel">
          <h3 className="font-semibold text-manga-black mb-4">Character Notes</h3>
          <textarea
            placeholder="Character development notes..."
            className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-manga-red/20 focus:border-manga-red"
          />
        </div>
      </div>
    </div>
  );
};

export default StoryBuilder;