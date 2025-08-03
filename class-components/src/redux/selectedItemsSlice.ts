import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedItemsState {
  selectedIds: number[];
}

const initialState: SelectedItemsState = {
  selectedIds: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelected(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.selectedIds.includes(id)) {
        state.selectedIds = state.selectedIds.filter((i) => i !== id);
      } else {
        state.selectedIds.push(id);
      }
    },
    setSelected(state, action: PayloadAction<number[]>) {
      state.selectedIds = action.payload;
    },
    clearSelected(state) {
      state.selectedIds = [];
    },
  },
});

export const { toggleSelected, setSelected, clearSelected } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
