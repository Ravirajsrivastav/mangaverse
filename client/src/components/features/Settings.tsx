import React from 'react';
import { ArrowLeft, User, Bell, Palette, Shield, Circle as HelpCircle, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Settings: React.FC = () => {
  const { setCurrentView, user } = useApp();

  const settingsSections = [
    {
      icon: User,
      title: 'Profile Settings',
      description: 'Manage your account information and preferences',
      items: ['Edit Profile', 'Change Password', 'Account Privacy'],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Control how you receive updates and alerts',
      items: ['Email Notifications', 'Push Notifications', 'Project Updates'],
    },
    {
      icon: Palette,
      title: 'Appearance',
      description: 'Customize the look and feel of your workspace',
      items: ['Theme Selection', 'Color Scheme', 'Layout Preferences'],
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your privacy settings and security options',
      items: ['Data Privacy', 'Two-Factor Auth', 'Login History'],
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
          <h1 className="text-3xl font-bold text-manga-black">Settings</h1>
          <p className="text-manga-lightgray mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {settingsSections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-panel">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-manga-red/10 rounded-lg">
                  <section.icon size={24} className="text-manga-red" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-manga-black mb-2">
                    {section.title}
                  </h3>
                  <p className="text-manga-lightgray mb-4">
                    {section.description}
                  </p>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <button
                        key={itemIndex}
                        className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-manga-gray hover:text-manga-black"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-panel">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-manga-red to-manga-darkred rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-manga-black">{user.name}</h3>
              <p className="text-manga-lightgray">{user.role}</p>
              <button className="mt-4 w-full py-2 text-center text-sm font-medium text-manga-red hover:bg-manga-red hover:text-white rounded-lg border border-manga-red/20 transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-panel">
            <h3 className="font-semibold text-manga-black mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <HelpCircle size={16} className="text-manga-gray" />
                <span className="text-manga-gray">Help & Support</span>
              </button>
              <button className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <LogOut size={16} className="text-red-500" />
                <span className="text-red-500">Sign Out</span>
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-manga-red/10 to-manga-red/5 rounded-xl p-4 border border-manga-red/20">
            <h3 className="font-semibold text-manga-black mb-2">Need Help?</h3>
            <p className="text-sm text-manga-gray mb-3">
              Check out our documentation and tutorials to get the most out of MangaVerse.
            </p>
            <button className="text-sm text-manga-red font-medium hover:underline">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;