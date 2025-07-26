import type { Character } from '../../types';
interface AppState {
  inputValue: string;
  results: Character[];
  isLoading: boolean;
  fetchError: Error | null;
}
export const API_URL = 'https://rickandmortyapi.com/api/character/';

export const INIT_STATE: AppState = {
  inputValue: '',
  results: [],
  isLoading: false,
  fetchError: null,
};
