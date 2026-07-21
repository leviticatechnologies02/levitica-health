import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Building2 } from 'lucide-react';

const Branches = () => {
  return (
    <ModulePlaceholder
      title="Branches"
      icon={Building2}
      description="Manage hospital branches in your region."
      usefulness="This module allows Region Admins to effectively manage branches across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Branches;
