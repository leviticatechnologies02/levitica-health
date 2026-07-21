import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Building2 } from 'lucide-react';

const Branches = () => {
  return (
    <ModulePlaceholder
      title="Branches"
      icon={Building2}
      description="Manage hospital branches in your group."
      usefulness="This module allows Group Admins to effectively manage branches across their designated group, ensuring compliance and operational efficiency."
    />
  );
};

export default Branches;
