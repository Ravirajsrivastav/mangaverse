import React from 'react';
import { MoveHorizontal as MoreHorizontal, Calendar, User } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const RecentProjects: React.FC = () => {
  const { setCurrentView, setCurrentProject } = useApp();

  const projects = [
    {
      id: 1,
      title: 'Cyber Samurai Chronicles',
      description: 'Futuristic action manga series with cyberpunk elements',
      progress: 75,
      lastUpdated: '2 hours ago',
      collaborators: 3,
      thumbnail: 'https://images.pexels.com/photos/7915309/pexels-photo-7915309.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 2,
      title: 'School Romance Diary',
      description: 'Slice-of-life romantic comedy set in high school',
      progress: 45,
      lastUpdated: '1 day ago',
      collaborators: 2,
      thumbnail: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: 3,
      title: 'Dragon Quest Adventures',
      description: 'Fantasy adventure with mythical creatures and magic',
      progress: 90,
      lastUpdated: '3 days ago',
      collaborators: 5,
      thumbnail: 'https://images.pexels.com/photos/8111815/pexels-photo-8111815.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const handleProjectClick = (project: any) => {
    setCurrentProject(project);
    setCurrentView('panel-editor');
  };

  const handleViewAll = () => {
    setCurrentView('projects');
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-panel animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-manga-black">Recent Projects</h2>
        <button 
          onClick={handleViewAll}
          className="text-manga-red font-medium hover:text-manga-darkred transition-colors"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleProjectClick(project)}
            className="border border-gray-200 rounded-lg p-4 hover:border-manga-red/30 hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-start space-x-4">
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
                    <p className="text-sm text-manga-lightgray mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100">
                    <MoreHorizontal size={16} className="text-manga-lightgray" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4 text-xs text-manga-lightgray">
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
    </div>
  );
};

export default RecentProjects;