import React from 'react';
import ModulePlaceholder from '../../../components/common/ModulePlaceholder';
import { Building2 } from 'lucide-react';

const Profile = () => {
  return (
    <ModulePlaceholder
      title="Hospital Profile"
      icon={Building2}
      description="Manage your hospital's core information, contact details, and branding."
      usefulness="Keeping the hospital profile updated ensures that patients see accurate contact numbers, operating hours, and official logos across all patient-facing portals and printed invoices. It acts as the digital identity of the institution."
    />
  );
};

export default Profile;
