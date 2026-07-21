import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { DollarSign } from 'lucide-react';

const RepRevenue = () => {
  return (
    <ModulePlaceholder
      title="Revenue Reports"
      icon={DollarSign}
      description="Manage revenue reports settings and configurations."
      usefulness="Analyze revenue generation."
    />
  );
};

export default RepRevenue;
