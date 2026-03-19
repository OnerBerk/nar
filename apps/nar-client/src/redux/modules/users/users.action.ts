import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '@/configs/api';
import {ActivityLevelEnum, NarUser, ThunkExtra} from '@/types';

type UpdateUserPayload = {
  activity_level: ActivityLevelEnum;
};

export const updateUser = createAsyncThunk<NarUser, UpdateUserPayload, {extra: ThunkExtra}>(
  'users/update',
  async ({activity_level}, {extra, rejectWithValue}) => {
    try {
      const response = await api.put(`/users/me`, {activity_level});
      localStorage.setItem('user', JSON.stringify(response.data));
      extra.toast.success("Niveau d'activite mis a jour");
      return response.data as NarUser;
    } catch (err) {
      extra.toast.error('Erreur lors de la mise a jour');
      return rejectWithValue(err || 'Erreur lors de la mise a jour');
    }
  }
);
