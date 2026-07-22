import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { MapPin } from 'lucide-react';

const Regions = () => {
  return (
    <ModulePlaceholder
      title="Regions"
      icon={MapPin}
      description="Manage regions settings and configurations."
      usefulness="Manage geographical regions."
    />
  );
};

export default Regions;
