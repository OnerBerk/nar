import React, {useCallback, useEffect} from 'react';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {useSelector} from 'react-redux';
import {getMeasurements} from '@/redux/modules/measurements/measurements.actions';
import {RootState} from '@/redux/stores';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MeasurementsListPage from '../measurements/measurements-list-page';
import {useNavigate} from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const measurements = useSelector((state: RootState) => state.measurements.measurements);

  const fetchMeasurements = useCallback(() => {
    dispatch(getMeasurements())
      .unwrap()
      .then((measurements) => {
        if (!measurements || measurements.length === 0) {
          navigate('/measurements/create');
        }
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    fetchMeasurements();
  }, [fetchMeasurements]);

  return (
    <Stack height='100%' p={2} alignItems='center' width='100%'>
      <Typography fontSize='2rem'>Tableau de bord</Typography>
      <MeasurementsListPage measurements={measurements || []} />
    </Stack>
  );
};

export default HomePage;
