import React, { useState } from 'react';
import { ArrowLeft, Search, ListFilter as Filter, Heart, Share, Download, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Gallery: React.FC = () => {
  const { setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'action', name: 'Action' },
    { id: 'romance', name: 'Romance' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'slice-of-life', name: 'Slice of Life' },
  ];

  const artworks = [
    {
      id: 1,
      title: 'Cyber Warrior',
      artist: 'Creator',
      category: 'action',
      likes: 245,
      views: 1200,
      image: 'https://images.pexels.com/photos/7915309/pexels-photo-7915309.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'School Days',
      artist: 'Creator',
      category: 'romance',
      likes: 189,
      views: 890,
      image: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'Dragon\'s Lair',
      artist: 'Creator',
      category: 'fantasy',
      likes: 312,
      views: 1500,
      image: 'https://images.pexels.com/photos/8111815/pexels-photo-8111815.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 4,
      title: 'Mystery Club',
      artist: 'Creator',
      category: 'slice-of-life',
      likes: 156,
      views: 670,
      image: 'https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const filteredArtworks = selectedCategory === 'all' 
    ? artworks 
    : artworks.filter(artwork => artwork.category === selectedCategory);

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
          <h1 className="text-3xl font-bold text-manga-black">Art Gallery</h1>
          <p className="text-manga-lightgray mt-1">Showcase and discover amazing manga art</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-manga-lightgray" />
            <input
              type="text"
              placeholder="Search artworks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-manga-red/20 focus:border-manga-red"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="text-manga-gray" />
              <span className="text-sm text-manga-gray">Filter</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-manga-red text-white'
                  : 'bg-gray-100 text-manga-gray hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <Heart size={16} className="text-manga-red" />
                    </button>
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <Share size={16} className="text-manga-gray" />
                    </button>
                    <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                      <Download size={16} className="text-manga-gray" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <h3 className="font-semibold text-manga-black group-hover:text-manga-red transition-colors">
                  {artwork.title}
                </h3>
                <p className="text-sm text-manga-lightgray">by {artwork.artist}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-manga-lightgray">
                  <div className="flex items-center space-x-1">
                    <Heart size={12} />
                    <span>{artwork.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye size={12} />
                    <span>{artwork.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;