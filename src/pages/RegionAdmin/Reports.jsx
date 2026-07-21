import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { BarChart2 } from 'lucide-react';

const Reports = () => {
  return (
    <ModulePlaceholder
      title="Reports"
      icon={BarChart2}
      description="Generate regional analytics and reports."
      usefulness="This module allows Region Admins to effectively manage reports across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Reports;
