import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { LayoutDashboard } from 'lucide-react';

const Dashboard = () => {
  return (
    <ModulePlaceholder
      title="Admin Dashboard"
      icon={LayoutDashboard}
      description="Overview of your hospital's performance and key metrics."
      usefulness="The dashboard provides a bird's-eye view of hospital operations, including active patients, staff on duty, and urgent alerts. It helps hospital administrators make quick, data-driven decisions and identify bottlenecks in real-time."
    />
  );
};

export default Dashboard;
