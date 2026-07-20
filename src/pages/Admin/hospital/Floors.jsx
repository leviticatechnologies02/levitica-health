import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Layers } from 'lucide-react';

const Floors = () => {
  return (
    <ModulePlaceholder
      title="Hospital Floors"
      icon={Layers}
      description="Manage floor plans and level configurations across hospital blocks."
      usefulness="Categorizing infrastructure by floor helps in efficiently assigning nursing stations to specific levels. It also aids maintenance staff and security teams in localizing issues to exact levels within a block."
    />
  );
};

export default Floors;
