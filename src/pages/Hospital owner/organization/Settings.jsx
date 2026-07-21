import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Settings } from 'lucide-react';

const OrgSettings = () => {
  return (
    <ModulePlaceholder
      title="Organization Settings"
      icon={Settings}
      description="Manage organization settings and configurations."
      usefulness="Configure organization preferences."
    />
  );
};

export default OrgSettings;
