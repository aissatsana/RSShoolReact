export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export interface AppState {
  inputValue: string;
  searchTerm: string;
  results: Character[];
  isLoading: boolean;
  errorMessage: string;
}
