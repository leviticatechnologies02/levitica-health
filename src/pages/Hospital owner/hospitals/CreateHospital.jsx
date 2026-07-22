import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { PlusSquare } from 'lucide-react';

const CreateHospital = () => {
  return (
    <ModulePlaceholder
      title="Create Hospital"
      icon={PlusSquare}
      description="Manage create hospital settings and configurations."
      usefulness="Add new hospitals to the organization."
    />
  );
};

export default CreateHospital;
