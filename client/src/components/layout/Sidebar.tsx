import React from 'react';
import { Hop as Home, Palette, Users, BookOpen, Image, Wand as Wand2, Settings, FolderOpen, CirclePlus as PlusCircle, GalleryVertical as Gallery, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentView, setCurrentView } = useApp();

  const navigation = [
    { name: 'Dashboard', icon: Home, view: 'dashboard' as const },
    { name: 'Create New', icon: PlusCircle, view: 'create' as const },
    { name: 'My Projects', icon: FolderOpen, view: 'projects' as const },
    { name: 'AI Assistant', icon: Wand2, view: 'ai-assistant' as const },
    { name: 'Character Library', icon: Users, view: 'characters' as const },
    { name: 'Panel Editor', icon: Image, view: 'panel-editor' as const },
    { name: 'Story Builder', icon: BookOpen, view: 'story-builder' as const },
    { name: 'Art Gallery', icon: Gallery, view: 'gallery' as const },
    { name: 'Style Tools', icon: Palette, view: 'style-tools' as const },
  ];

  const quickAccess = [
    { name: 'Recent Project 1', type: 'Romance Manga' },
    { name: 'Character Design', type: 'Sketch Collection' },
    { name: 'Action Series', type: 'In Progress' },
  ];

  const handleNavClick = (view: typeof currentView) => {
    setCurrentView(view);
    onClose(); // Close mobile sidebar after navigation
  };

  const handleQuickAccessClick = (projectName: string) => {
    console.log(`Opening project: ${projectName}`);
    setCurrentView('projects');
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex justify-end p-4 md:hidden">
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} className="text-manga-gray" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-1">
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-manga-lightgray uppercase tracking-wider mb-3">
                Workspace
              </h3>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.view)}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left
                    ${currentView === item.view
                      ? 'bg-manga-red text-white shadow-manga' 
                      : 'text-manga-gray hover:bg-gray-50 hover:text-manga-black'
                    }
                  `}
                >
                  <item.icon size={18} className="mr-3" />
                  {item.name}
                </button>
              ))}
            </div>

            {/* Quick Access */}
            <div>
              <h3 className="px-3 text-xs font-semibold text-manga-lightgray uppercase tracking-wider mb-3">
                Quick Access
              </h3>
              <div className="space-y-2">
                {quickAccess.map((project, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAccessClick(project.name)}
                    className="px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors w-full text-left"
                  >
                    <div className="text-sm font-medium text-manga-black">{project.name}</div>
                    <div className="text-xs text-manga-lightgray">{project.type}</div>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Settings */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => handleNavClick('settings')}
              className="flex items-center px-3 py-2 text-sm font-medium text-manga-gray hover:bg-gray-50 hover:text-manga-black rounded-lg transition-colors"
            >
              <Settings size={18} className="mr-3" />
              Settings
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;