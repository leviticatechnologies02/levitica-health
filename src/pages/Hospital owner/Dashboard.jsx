import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <ModulePlaceholder
      title="Dashboard"
      icon={LayoutDashboard}
      description="Manage dashboard settings and configurations."
      usefulness="Provides an overview of the organization."
    />
  );
};

export default Dashboard;
