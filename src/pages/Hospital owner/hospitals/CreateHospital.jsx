import React from 'react';
import AddHospital from '../../superadmin/AddHospital';

const CreateHospital = () => {
  return (
    <div className="p-6">
      <AddHospital returnPath="/hospital-owner/hospitals/list" />
    </div>
  );
};

export default CreateHospital;
