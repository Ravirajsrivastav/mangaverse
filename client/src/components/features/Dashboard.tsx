import React from 'react';
import WelcomeSection from './dashboard/WelcomeSection';
import StatsCards from './dashboard/StatsCards';
import RecentProjects from './dashboard/RecentProjects';
import AIInsights from './dashboard/AIInsights';
import QuickActions from './dashboard/QuickActions';
import CreationTools from './dashboard/CreationTools';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <WelcomeSection />
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <RecentProjects />
          <CreationTools />
        </div>
        
        <div className="space-y-8">
          <QuickActions />
          <AIInsights />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;