import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCharacters } from './charactersApi';
import type { Character } from '../../types';

interface CharactersState {
  results: Character[];
  isLoading: boolean;
  fetchError: string | null;
  totalPages: number;
}

const initialState: CharactersState = {
  results: [],
  isLoading: false,
  fetchError: null,
  totalPages: 1,
};

export const getCharacters = createAsyncThunk(
  'characters/fetch',
  async ({ term, page }: { term: string; page: number }) => {
    const data = await fetchCharacters(term, page);
    return data;
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.isLoading = true;
        state.fetchError = null;
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.results = action.payload.results;
        state.totalPages = action.payload.info.pages;
        state.isLoading = false;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.fetchError = action.error.message ?? 'Ошибка загрузки';
        state.isLoading = false;
      });
  },
});

export default charactersSlice.reducer;
