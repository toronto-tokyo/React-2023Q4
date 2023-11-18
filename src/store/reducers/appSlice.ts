import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API } from '../../constants/constants';

type AppStore = {
  searchTerm: string;
  itemsPerPage: number;
  isMainPageLoading: boolean;
  isDetailedPageLoading: boolean;
};

const initialState: AppStore = {
  searchTerm: '',
  itemsPerPage: API.itemsPerPage,
  isMainPageLoading: true,
  isDetailedPageLoading: true,
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
    setIsMainPageLoading(state, action: PayloadAction<boolean>) {
      state.isMainPageLoading = action.payload;
    },
    setIsDetailedPageLoading(state, action: PayloadAction<boolean>) {
      state.isDetailedPageLoading = action.payload;
    },
  },
});

export default appSlice.reducer;
export const {
  changeSearchTerm,
  changeItemsPerPage,
  setIsMainPageLoading,
  setIsDetailedPageLoading,
} = appSlice.actions;
