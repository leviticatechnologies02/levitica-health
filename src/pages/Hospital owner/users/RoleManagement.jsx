import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Shield } from 'lucide-react';

const RoleManagement = () => {
  return (
    <ModulePlaceholder
      title="Role Management"
      icon={Shield}
      description="Manage role management settings and configurations."
      usefulness="Define and assign roles to users."
    />
  );
};

export default RoleManagement;
