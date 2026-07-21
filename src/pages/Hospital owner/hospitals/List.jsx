import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { List } from 'lucide-react';

const HospitalList = () => {
  return (
    <ModulePlaceholder
      title="Hospital List"
      icon={List}
      description="Manage hospital list settings and configurations."
      usefulness="View and manage hospitals."
    />
  );
};

export default HospitalList;
