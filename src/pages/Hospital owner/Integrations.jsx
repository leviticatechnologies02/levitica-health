import React from 'react';
import ModulePlaceholder from '../../components/common/ModulePlaceholder';
import { Link } from 'lucide-react';

const Integrations = () => {
  return (
    <ModulePlaceholder
      title="Integrations"
      icon={Link}
      description="Manage integrations settings and configurations."
      usefulness="Manage third-party integrations."
    />
  );
};

export default Integrations;
