import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { FileText } from 'lucide-react';

const CompLicenses = () => {
  return (
    <ModulePlaceholder
      title="Compliance Licenses"
      icon={FileText}
      description="Manage compliance licenses settings and configurations."
      usefulness="Track compliance-related licenses."
    />
  );
};

export default CompLicenses;
