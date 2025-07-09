export interface Result {}

export interface AppState {
  inputValue: string;
  searchTerm: string;
  results: Result[];
  isLoading: boolean;
  errorMessage: string;
}
