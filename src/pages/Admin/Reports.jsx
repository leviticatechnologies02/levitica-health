import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { BarChart3 } from 'lucide-react';

const Reports = () => {
  return (
    <ModulePlaceholder
      title="Hospital Reports"
      icon={BarChart3}
      description="Generate comprehensive analytical reports for hospital operations."
      usefulness="Analytics and reporting allow the administration to identify trends in patient admissions, revenue generation, and staff performance. It is essential for strategic planning, resource allocation, and optimizing hospital efficiency."
    />
  );
};

export default Reports;
