import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Package } from 'lucide-react';

const Inventory = () => {
  return (
    <ModulePlaceholder
      title="Hospital Inventory"
      icon={Package}
      description="Track hospital supplies, equipment, and medical assets."
      usefulness="Maintaining a strict inventory system prevents the shortage of crucial surgical supplies and everyday medical items. It also helps track expensive hospital assets and reduces financial waste from expired products."
    />
  );
};

export default Inventory;
