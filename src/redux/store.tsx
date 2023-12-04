import { configureStore } from '@reduxjs/toolkit';
import formsDataSlice from './reducers/formsDataSlice';

const store = configureStore({
  reducer: {
    formsDataSlice: formsDataSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
