import React from 'react';
import Dashboard from '../features/Dashboard';
import CreateNew from '../features/CreateNew';
import Projects from '../features/Projects';
import AIAssistant from '../features/AIAssistant';
import Characters from '../features/Characters';
import PanelEditor from '../features/PanelEditor';
import StoryBuilder from '../features/StoryBuilder';
import Gallery from '../features/Gallery';
import StyleTools from '../features/StyleTools';
import Settings from '../features/Settings';
import { useApp } from '../../context/AppContext';

interface MainContentProps {
  sidebarOpen: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ sidebarOpen }) => {
  const { currentView } = useApp();

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'create':
        return <CreateNew />;
      case 'projects':
        return <Projects />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'characters':
        return <Characters />;
      case 'panel-editor':
        return <PanelEditor />;
      case 'story-builder':
        return <StoryBuilder />;
      case 'gallery':
        return <Gallery />;
      case 'style-tools':
        return <StyleTools />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="flex-1 min-h-screen">
      <div className="p-6">
        {renderContent()}
      </div>
    </main>
  );
};

export default MainContent;