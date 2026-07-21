import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <ModulePlaceholder
      title="Settings"
      icon={SettingsIcon}
      description="Configure regional preferences."
      usefulness="This module allows Region Admins to effectively manage settings across their designated region, ensuring compliance and operational efficiency."
    />
  );
};

export default Settings;
