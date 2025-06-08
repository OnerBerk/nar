import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterType, ThunkExtra } from '@/types/types.ts';
import { api } from '@/configs/api.ts';

type LoginPayload = { email: string; password: string };

export const register = createAsyncThunk<void, RegisterType, { extra: ThunkExtra }>(
  'auth/register',
  async (data: RegisterType, { extra, rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', data);
      extra.toast.success('Inscription réussie');
      extra.navigate('/login');
      return response.data;
    } catch (err) {
      extra.toast.error("Erreur lors de l'inscription : ");
      return rejectWithValue(err || 'Erreur lors de l’inscription');
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await api.post(`/auth/login`, data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return response.data;
    } catch (err) {
      return rejectWithValue(err || 'Erreur lors de la connexion');
    }
  },
);
