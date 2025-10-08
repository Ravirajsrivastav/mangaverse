import React from 'react';
import { Menu, User, Settings, Bell, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, notifications, setNotifications, setCurrentView } = useApp();

  const handleNotificationClick = () => {
    setNotifications(0);
    // Here you would typically show a notifications panel
    console.log('Notifications clicked');
  };

  const handleSettingsClick = () => {
    setCurrentView('settings');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          >
            <Menu size={20} className="text-manga-gray" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-manga-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl text-manga-black">
                MangaVerse
              </h1>
              <p className="text-xs text-manga-lightgray -mt-1">AI Creation Platform</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-manga-lightgray" />
            <input
              type="text"
              placeholder="Search projects, characters, or tools..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-manga-red/20 focus:border-manga-red transition-all"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={handleNotificationClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
          >
            <Bell size={18} className="text-manga-gray" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-manga-red text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          
          <button 
            onClick={handleSettingsClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Settings size={18} className="text-manga-gray" />
          </button>
          
          <div className="h-6 w-px bg-gray-300 mx-2" />
          
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-7 h-7 bg-gradient-to-br from-manga-red to-manga-darkred rounded-full flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-manga-gray">{user.name}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;