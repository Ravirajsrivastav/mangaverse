import React from 'react';
import { ArrowLeft, Plus, Search, ListFilter as Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Characters: React.FC = () => {
  const { setCurrentView } = useApp();

  const characters = [
    {
      id: 1,
      name: 'Akira Tanaka',
      role: 'Protagonist',
      age: 17,
      description: 'A determined high school student with a mysterious past',
      image: 'https://images.pexels.com/photos/7915309/pexels-photo-7915309.jpeg?auto=compress&cs=tinysrgb&w=200',
      traits: ['Brave', 'Loyal', 'Impulsive'],
      projects: ['Cyber Samurai Chronicles'],
    },
    {
      id: 2,
      name: 'Yuki Sato',
      role: 'Love Interest',
      age: 16,
      description: 'Smart and kind-hearted student council president',
      image: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=200',
      traits: ['Intelligent', 'Caring', 'Responsible'],
      projects: ['School Romance Diary'],
    },
    {
      id: 3,
      name: 'Dragon Lord Zephyr',
      role: 'Antagonist',
      age: 1000,
      description: 'Ancient dragon with immense magical powers',
      image: 'https://images.pexels.com/photos/8111815/pexels-photo-8111815.jpeg?auto=compress&cs=tinysrgb&w=200',
      traits: ['Powerful', 'Cunning', 'Ancient'],
      projects: ['Dragon Quest Adventures'],
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
          <h1 className="text-3xl font-bold text-manga-black">Character Library</h1>
          <p className="text-manga-lightgray mt-1">Manage your manga characters</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-manga-lightgray" />
            <input
              type="text"
              placeholder="Search characters..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-manga-red/20 focus:border-manga-red"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="text-manga-gray" />
              <span className="text-sm text-manga-gray">Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-manga-red text-white rounded-lg hover:bg-manga-darkred transition-colors">
              <Plus size={16} />
              <span className="text-sm">New Character</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-manga-red/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-manga-black group-hover:text-manga-red transition-colors">
                    {character.name}
                  </h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {character.role}
                  </span>
                </div>
                <p className="text-sm text-manga-lightgray mb-3">
                  Age: {character.age} • {character.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {character.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-manga-gray rounded-full"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-manga-lightgray">
                  Used in: {character.projects.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;