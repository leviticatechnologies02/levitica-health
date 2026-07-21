import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <ModulePlaceholder
      title="Dashboard"
      icon={LayoutDashboard}
      description="View high-level regional metrics."
      usefulness="This module allows Region Admins to effectively manage dashboard across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Dashboard;
