import React, { useState } from 'react';
import { ArrowLeft, Search, ListFilter as Filter, Grid2x2 as Grid, List, MoveHorizontal as MoreHorizontal, Calendar, User, Play } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Projects: React.FC = () => {
  const { setCurrentView, setCurrentProject } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 1,
      title: 'Cyber Samurai Chronicles',
      description: 'Futuristic action manga series with cyberpunk elements',
      progress: 75,
      lastUpdated: '2 hours ago',
      collaborators: 3,
      status: 'active',
      thumbnail: 'https://images.pexels.com/photos/7915309/pexels-photo-7915309.jpeg?auto=compress&cs=tinysrgb&w=400',
      chapters: 12,
      pages: 156,
    },
    {
      id: 2,
      title: 'School Romance Diary',
      description: 'Slice-of-life romantic comedy set in high school',
      progress: 45,
      lastUpdated: '1 day ago',
      collaborators: 2,
      status: 'draft',
      thumbnail: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=400',
      chapters: 8,
      pages: 89,
    },
    {
      id: 3,
      title: 'Dragon Quest Adventures',
      description: 'Fantasy adventure with mythical creatures and magic',
      progress: 90,
      lastUpdated: '3 days ago',
      collaborators: 5,
      status: 'completed',
      thumbnail: 'https://images.pexels.com/photos/8111815/pexels-photo-8111815.jpeg?auto=compress&cs=tinysrgb&w=400',
      chapters: 20,
      pages: 280,
    },
    {
      id: 4,
      title: 'Mystery Detective Club',
      description: 'High school students solving supernatural mysteries',
      progress: 30,
      lastUpdated: '1 week ago',
      collaborators: 1,
      status: 'draft',
      thumbnail: 'https://images.pexels.com/photos/6985001/pexels-photo-6985001.jpeg?auto=compress&cs=tinysrgb&w=400',
      chapters: 5,
      pages: 67,
    },
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectClick = (project: any) => {
    setCurrentProject(project);
    setCurrentView('panel-editor');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
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
          <h1 className="text-3xl font-bold text-manga-black">My Projects</h1>
          <p className="text-manga-lightgray mt-1">Manage and organize your manga projects</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-manga-lightgray" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-manga-red/20 focus:border-manga-red"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} className="text-manga-gray" />
              <span className="text-sm text-manga-gray">Filter</span>
            </button>
            
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-manga-red text-white' : 'text-manga-gray hover:bg-gray-50'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-manga-red text-white' : 'text-manga-gray hover:bg-gray-50'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="border border-gray-200 rounded-lg overflow-hidden hover:border-manga-red/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-manga-black group-hover:text-manga-red transition-colors">
                      {project.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-manga-lightgray mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-manga-lightgray mb-3">
                    <span>{project.chapters} chapters</span>
                    <span>{project.pages} pages</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div
                      className="bg-manga-red h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-manga-lightgray">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{project.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{project.collaborators}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleProjectClick(project)}
                className="border border-gray-200 rounded-lg p-4 hover:border-manga-red/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-manga-black group-hover:text-manga-red transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-manga-lightgray mt-1">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100">
                          <MoreHorizontal size={16} className="text-manga-lightgray" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4 text-xs text-manga-lightgray">
                        <span>{project.chapters} chapters</span>
                        <span>{project.pages} pages</span>
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{project.lastUpdated}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={12} />
                          <span>{project.collaborators} collaborators</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-manga-red rounded-full transition-all duration-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-manga-lightgray">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;