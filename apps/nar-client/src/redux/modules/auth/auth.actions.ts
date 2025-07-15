import {createAsyncThunk} from '@reduxjs/toolkit';
import {RegisterType, ThunkExtra, NarUser} from '@/types/types.ts';
import {api} from '@/configs/api.ts';

type LoginPayload = {email: string; password: string};

export const register = createAsyncThunk<void, RegisterType, {extra: ThunkExtra}>(
  'auth/register',
  async (data: RegisterType, {extra, rejectWithValue}) => {
    try {
      await api.post('/auth/register', data);
      extra.toast.success('Inscription réussie');
    } catch (err) {
      extra.toast.error("Erreur lors de l'inscription : ");
      return rejectWithValue(err || "Erreur lors de l'inscription");
    }
  }
);

export const login = createAsyncThunk<NarUser, LoginPayload, {extra: ThunkExtra}>(
  'auth/login',
  async (data: LoginPayload, {extra, rejectWithValue}) => {
    try {
      const response = await api.post(`/auth/login`, data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      const user = response.data.user;
      extra.toast.success('Connexion réussie');
      extra.navigate('/');
      return user;
    } catch (err) {
      extra.toast.error('Erreur lors de la connexion');
      return rejectWithValue(err || 'Erreur lors de la connexion');
    }
  }
);

export const logout = createAsyncThunk<void, void, {extra: ThunkExtra}>('auth/logout', async (_, {extra}) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  extra.navigate('/auth');
});
