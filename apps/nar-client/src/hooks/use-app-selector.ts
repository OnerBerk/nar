import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../redux/stores.ts';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
