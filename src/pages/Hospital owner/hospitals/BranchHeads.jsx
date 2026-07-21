import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { UserCheck } from 'lucide-react';

const HospitalBranchHeads = () => {
  return (
    <ModulePlaceholder
      title="Branch Heads"
      icon={UserCheck}
      description="Manage branch heads settings and configurations."
      usefulness="Manage heads of different branches."
    />
  );
};

export default HospitalBranchHeads;
