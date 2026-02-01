import React, {useCallback} from 'react';
import {useForm} from 'react-hook-form';

import {CreateMeasurementData} from '@/types';

import Grid from '@mui/material/Grid';
import NarTextField from '@/ui-components/nar-textfield';
import {useAppDispatch} from '@/hooks/use-app-dispatch';
import {createMeasurement} from '@/redux/modules/measurements/measurements.actions';
import {Button, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import PaperContainer from '../ui-components/paper-container';

const MeasurmentsForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {handleSubmit, control} = useForm<CreateMeasurementData>({
    mode: 'onChange',
    defaultValues: {
      date: new Date().toISOString(),
      weight: 0,
      height: 0,
      waist: 0,
      thigh: 0,
      arm: 0,
      chest: 0,
    },
  });

  const onSubmit = useCallback(
    (data: CreateMeasurementData) => {
      const newData = {
        ...data,
        weight: data.weight * 100,
      };
      dispatch(createMeasurement(newData))
        .unwrap()
        .then(() => {
          navigate('/measurements');
        });
    },
    [dispatch, navigate]
  );

  return (
    <PaperContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={5} maxWidth={1200} p={3}>
          <Grid size={6}>
            <NarTextField
              label='Taille'
              rules={{
                required: 'La taille est requise',
                min: {value: 70, message: 'La taille doit être supérieure à 70 cm'},
              }}
              name='height'
              type='number'
              control={control}
              isRequired
              endAdornment={<Typography variant='subtitle2'>cm</Typography>}
            />
          </Grid>
          <Grid size={6}>
            <NarTextField
              label='Poids'
              rules={{required: 'Le poids est requis', min: {value: 1, message: 'Le poids doit être supérieur à 0'}}}
              name='weight'
              type='number'
              control={control}
              isRequired
              endAdornment={<Typography variant='subtitle2'>Kg</Typography>}
            />
          </Grid>

          <Grid size={6}>
            <NarTextField
              label='Tour de taille'
              rules={{
                required: 'Le tour de taille est requise',
                min: {value: 40, message: 'Le tour de taille doit être supérieure à 40 cm'},
              }}
              name='waist'
              type='number'
              control={control}
              isRequired
              endAdornment={<Typography variant='subtitle2'>cm</Typography>}
            />
          </Grid>
          <Grid size={6}>
            <NarTextField
              label='Tour de cuisse'
              rules={{
                required: 'Le tour de cuisse est requise',
                min: {value: 40, message: 'Le tour de cuisse doit être supérieure à 40 cm'},
              }}
              name='thigh'
              type='number'
              control={control}
              isRequired
              endAdornment={<Typography variant='subtitle2'>cm</Typography>}
            />
          </Grid>

          <Grid size={6}>
            <NarTextField
              label='Tour de bras'
              rules={{
                required: 'Le tour de bras est requise',
                min: {value: 40, message: 'Le tour de bras doit être supérieure à 40 cm'},
              }}
              name='arm'
              type='number'
              control={control}
              isRequired
              endAdornment={<Typography variant='subtitle2'>cm</Typography>}
            />
          </Grid>
          <Grid size={6}>
            <NarTextField
              label='Tour de poitrine'
              rules={{
                required: 'Le tour de poitrine est requise',
                min: {value: 40, message: 'Le tour de poitrine doit être supérieure à 40 cm'},
              }}
              name='chest'
              type='number'
              control={control}
              isRequired
              endAdornment={<Typography variant='subtitle2'>cm</Typography>}
            />
          </Grid>

          <Grid size={12} sx={{display: 'flex', justifyContent: 'center', marginTop: 1}}>
            <Button type='submit' variant='outlined' sx={{border: 'none'}}>
              Enregistrer
            </Button>
          </Grid>
        </Grid>
      </form>
    </PaperContainer>
  );
};

export default MeasurmentsForm;
