import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Receipt } from 'lucide-react';

const SubBilling = () => {
  return (
    <ModulePlaceholder
      title="Billing"
      icon={Receipt}
      description="Manage billing settings and configurations."
      usefulness="Manage billing information and history."
    />
  );
};

export default SubBilling;
