import React from 'react';
import { CirclePlus as PlusCircle, Wand as Wand2, Users, Download } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

const QuickActions: React.FC = () => {
  const { setCurrentView } = useApp();

  const actions = [
    {
      icon: PlusCircle,
      title: 'New Project',
      description: 'Start a fresh manga project',
      color: 'from-manga-red to-manga-darkred',
      textColor: 'text-white',
      action: () => setCurrentView('create'),
    },
    {
      icon: Wand2,
      title: 'AI Generate',
      description: 'Create with AI assistance',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-white',
      action: () => setCurrentView('ai-assistant'),
    },
    {
      icon: Users,
      title: 'Collaborate',
      description: 'Invite team members',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-white',
      action: () => console.log('Collaboration feature coming soon!'),
    },
    {
      icon: Download,
      title: 'Export',
      description: 'Download your manga',
      color: 'from-green-500 to-green-600',
      textColor: 'text-white',
      action: () => console.log('Export feature coming soon!'),
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-panel animate-fade-in-up">
      <h2 className="text-xl font-bold text-manga-black mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={action.title}
            onClick={action.action}
            className={`
              bg-gradient-to-br ${action.color} p-4 rounded-lg ${action.textColor}
              hover:scale-105 transition-all duration-300 hover:shadow-lg
              animate-scale-in
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <action.icon size={24} className="mb-2" />
            <div className="text-left">
              <div className="font-semibold text-sm">{action.title}</div>
              <div className="text-xs opacity-90">{action.description}</div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
        <h3 className="font-semibold text-manga-black mb-2">Pro Tip</h3>
        <p className="text-sm text-manga-lightgray">
          Use AI character generation to quickly create consistent character designs across your manga series.
        </p>
      </div>
    </div>
  );
};

export default QuickActions;