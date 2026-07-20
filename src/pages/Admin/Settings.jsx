import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Settings as SettingsIcon } from 'lucide-react';

const Settings = () => {
  return (
    <ModulePlaceholder
      title="Hospital Settings"
      icon={SettingsIcon}
      description="Configure hospital parameters, timings, and integrations."
      usefulness="Settings provide the flexibility needed to tailor the platform to your hospital's specific operational workflows. You can configure shift timings, API keys for external labs, SMS gateways for patient reminders, and RBAC rules."
    />
  );
};

export default Settings;
