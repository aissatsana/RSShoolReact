export interface Character {
  id: number;
  name: string;
  gender: string;
  image: string;
}

export interface AppState {
  inputValue: string;
  searchTerm: string;
  results: Character[];
  isLoading: boolean;
  fetchError: Error | null;
}
