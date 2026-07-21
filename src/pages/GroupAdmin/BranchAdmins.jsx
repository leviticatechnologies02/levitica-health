import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { UserCheck } from 'lucide-react';

const BranchAdmins = () => {
  return (
    <ModulePlaceholder
      title="Branch Admins"
      icon={UserCheck}
      description="Manage administrators for specific branches."
      usefulness="This module allows Group Admins to effectively manage branch admins across their designated group, ensuring compliance and operational efficiency."
    />
  );
};

export default BranchAdmins;
