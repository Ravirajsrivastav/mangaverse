import React from 'react';
import { Brain, TrendingUp, Clock, Star } from 'lucide-react';

const AIInsights: React.FC = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: 'Style Analysis',
      description: 'Your art style has improved 23% this month',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Clock,
      title: 'Time Saved',
      description: '12 hours saved using AI tools this week',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Star,
      title: 'Quality Score',
      description: 'Your latest panels scored 9.2/10',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-panel animate-fade-in-up">
      <div className="flex items-center space-x-2 mb-6">
        <Brain size={20} className="text-manga-red" />
        <h2 className="text-xl font-bold text-manga-black">AI Insights</h2>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={insight.title}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-slide-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`p-2 rounded-lg ${insight.bgColor}`}>
              <insight.icon size={16} className={insight.color} />
            </div>
            <div>
              <h3 className="font-medium text-manga-black text-sm">{insight.title}</h3>
              <p className="text-xs text-manga-lightgray mt-1">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-gradient-to-r from-manga-red/5 to-manga-red/10 rounded-lg border border-manga-red/10">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-manga-red rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-manga-red">AI Suggestion</span>
        </div>
        <p className="text-sm text-manga-gray">
          Your character expressions could benefit from more dynamic angles. Try the new emotion generator tool!
        </p>
      </div>
    </div>
  );
};

export default AIInsights;