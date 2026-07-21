import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <ModulePlaceholder
      title="Settings"
      icon={SettingsIcon}
      description="Manage general settings and configurations."
      usefulness="Manage overall settings."
    />
  );
};

export default Settings;
