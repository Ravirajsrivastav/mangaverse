import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ViewType = 'dashboard' | 'create' | 'projects' | 'ai-assistant' | 'characters' | 'panel-editor' | 'story-builder' | 'gallery' | 'style-tools' | 'settings';

interface AppContextType {
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  projects: any[];
  currentProject: any;
  setCurrentProject: (project: any) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  notifications: number;
  setNotifications: (count: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = useState(null);
  const [currentView, setCurrentView] = useState<ViewType>('create');
  const [notifications, setNotifications] = useState(3);
  
  const user = {
    name: 'Creator',
    avatar: '',
    role: 'Manga Artist',
  };
  
  const projects = [
    { id: 1, name: 'Cyber Samurai Chronicles', status: 'active' },
    { id: 2, name: 'School Romance Diary', status: 'draft' },
    { id: 3, name: 'Dragon Quest Adventures', status: 'completed' },
  ];

  const value = {
    user,
    projects,
    currentProject,
    setCurrentProject,
    currentView,
    setCurrentView,
    notifications,
    setNotifications,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};