import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_URL } from '../../../constants';
import { type CharacterDetail } from '../../../types';

interface CharacterDetailState {
  data: CharacterDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CharacterDetailState = {
  data: null,
  isLoading: false,
  error: null,
};

export const getCharacterById = createAsyncThunk(
  'characterDetail/fetchById',
  async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
);

const characterDetailSlice = createSlice({
  name: 'characterDetail',
  initialState,
  reducers: {
    clearCharacterDetail: (state) => {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharacterById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCharacterById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getCharacterById.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to load character detail';
        state.isLoading = false;
      });
  },
});

export const { clearCharacterDetail } = characterDetailSlice.actions;
export default characterDetailSlice.reducer;
