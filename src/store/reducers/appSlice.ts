import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../constants/constants';

type AppStore = {
  searchTerm: string;
  itemsPerPage: number;
};

const initialState: AppStore = {
  searchTerm: '',
  itemsPerPage: API.itemsPerPage,
};

const appSlice = createSlice({
  name: 'appStore',
  initialState,
  reducers: {
    changeSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    changeItemsPerPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { changeSearchTerm, changeItemsPerPage } = appSlice.actions;
