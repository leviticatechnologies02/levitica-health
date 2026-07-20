import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Blocks as BlocksIcon } from 'lucide-react';

const Blocks = () => {
  return (
    <ModulePlaceholder
      title="Hospital Blocks"
      icon={BlocksIcon}
      description="Manage large infrastructure blocks and buildings within the hospital campus."
      usefulness="For multi-building hospital campuses, mapping out 'Blocks' (e.g., North Block, OPD Block) is crucial for accurate patient navigation, emergency evacuation planning, and asset tracking per building."
    />
  );
};

export default Blocks;
