import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/stores.ts';

export const useAppDispatch = () => useDispatch<AppDispatch>();
