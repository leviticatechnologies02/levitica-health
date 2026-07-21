import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Key } from 'lucide-react';

const PermissionManagement = () => {
  return (
    <ModulePlaceholder
      title="Permission Management"
      icon={Key}
      description="Manage permission management settings and configurations."
      usefulness="Manage fine-grained permissions."
    />
  );
};

export default PermissionManagement;
