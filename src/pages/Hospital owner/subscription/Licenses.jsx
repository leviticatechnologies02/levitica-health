import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { FileText } from 'lucide-react';

const SubLicenses = () => {
  return (
    <ModulePlaceholder
      title="Licenses"
      icon={FileText}
      description="Manage licenses settings and configurations."
      usefulness="Manage software licenses."
    />
  );
};

export default SubLicenses;
