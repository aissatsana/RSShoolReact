import type { Character } from '../../types';

export interface AppState {
  inputValue: string;
  results: Character[];
  isLoading: boolean;
  fetchError: Error | null;
}
