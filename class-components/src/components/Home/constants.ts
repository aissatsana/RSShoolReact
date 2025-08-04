import type { AppState } from './types';

export const INIT_STATE: AppState = {
  inputValue: '',
  results: [],
  isLoading: false,
  fetchError: null,
};
