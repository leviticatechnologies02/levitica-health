import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { BarChart2 } from 'lucide-react';

const Reports = () => {
  return (
    <ModulePlaceholder
      title="Organization Reports"
      icon={BarChart2}
      description="Manage organization reports settings and configurations."
      usefulness="View organization-wide analytics."
    />
  );
};

export default Reports;
