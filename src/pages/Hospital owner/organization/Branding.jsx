import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Palette } from 'lucide-react';

const Branding = () => {
  return (
    <ModulePlaceholder
      title="Branding"
      icon={Palette}
      description="Manage branding settings and configurations."
      usefulness="Customize the appearance of the organization."
    />
  );
};

export default Branding;
