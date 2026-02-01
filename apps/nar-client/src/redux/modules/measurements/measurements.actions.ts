import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkExtra, Measurements, CreateMeasurementData} from '@/types';
import {api} from '@/configs/api.ts';

export const createMeasurement = createAsyncThunk<Measurements, CreateMeasurementData, {extra: ThunkExtra}>(
  'measurements/create',
  async (data: CreateMeasurementData, {extra, rejectWithValue}) => {
    try {
      const response = await api.post('/measurements', data);
      extra.toast.success('Mesures créées avec succès');
      return response.data;
    } catch (err) {
      extra.toast.error('Erreur lors de la création des mesures');
      return rejectWithValue(err || 'Erreur lors de la création des mesures');
    }
  }
);

export const getMeasurements = createAsyncThunk<Measurements[], void, {extra: ThunkExtra}>(
  'measurements/get',
  async (_, {rejectWithValue}) => {
    try {
      const response = await api.get('/measurements/user');
      return response.data;
    } catch (err) {
      return rejectWithValue(err || 'Erreur lors de la récupération des measurements');
    }
  }
);
