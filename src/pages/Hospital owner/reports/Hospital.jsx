import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { BarChart2 } from 'lucide-react';

const RepHospital = () => {
  return (
    <ModulePlaceholder
      title="Hospital Reports"
      icon={BarChart2}
      description="Manage hospital reports settings and configurations."
      usefulness="View hospital-specific reports."
    />
  );
};

export default RepHospital;
