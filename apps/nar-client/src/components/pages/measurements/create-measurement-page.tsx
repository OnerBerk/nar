import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/stores';

import MeasurmentsForm from '@/components/forms/measurments-form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import arrowRightIcon from '@/assets/icons/arrowRight.svg';
import Box from '@mui/material/Box';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {getMeasurements} from '@/redux/modules/measurements/measurements.actions';

const CreateMeasurementPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const measurements = useSelector((state: RootState) => state.measurements.measurements);
  const [showForm, setShowForm] = useState<boolean>(measurements?.length !== 0);

  const initialFetch = useCallback(() => {
    dispatch(getMeasurements());
  }, [dispatch]);

  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

  console.log(measurements);

  return (
    <Stack height='100%' justifyContent='center' alignItems='center'>
      {measurements?.length === 0 && !showForm && (
        <Stack>
          <Typography variant='h4'>Ajouter vos premières mesures</Typography>
          <Box
            component='button'
            sx={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}}
            onClick={() => setShowForm(true)}>
            <Box component='img' src={arrowRightIcon} alt='arrow-right' width={100} height={100} />
          </Box>
        </Stack>
      )}
      {showForm && <MeasurmentsForm />}
    </Stack>
  );
};

export default CreateMeasurementPage;
