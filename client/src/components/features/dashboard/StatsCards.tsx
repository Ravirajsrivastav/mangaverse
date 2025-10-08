import React from 'react';
import { FileText, Users, Image, Zap } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+3 this week',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Characters Created',
      value: '47',
      change: '+8 this month',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Panels Generated',
      value: '156',
      change: '+23 today',
      icon: Image,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'AI Assists Used',
      value: '89',
      change: '+12 today',
      icon: Zap,
      color: 'from-manga-red to-manga-darkred',
      bgColor: 'bg-red-50',
      iconColor: 'text-manga-red',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl p-6 shadow-panel hover:shadow-panel-hover transition-all duration-300 hover:-translate-y-1"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon size={24} className={stat.iconColor} />
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-manga-black">{stat.value}</h3>
            <p className="text-manga-lightgray text-sm font-medium">{stat.title}</p>
            <p className="text-green-600 text-xs font-medium">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;