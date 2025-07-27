import type { AppState } from './types';

export const API_URL = 'https://rickandmortyapi.com/api/character/';

export const INIT_STATE: AppState = {
  inputValue: '',
  results: [],
  isLoading: false,
  fetchError: null,
};
