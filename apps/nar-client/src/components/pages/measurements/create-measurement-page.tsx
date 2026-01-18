import React from 'react';

import MeasurmentsForm from '@/components/forms/measurments-form';

import PaperContainer from '@/components/ui-components/paper-container';

const CreateMeasurementPage: React.FC = () => {
  return (
    <PaperContainer>
      <MeasurmentsForm />
    </PaperContainer>
  );
};

export default CreateMeasurementPage;
