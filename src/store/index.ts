import { configureStore } from '@reduxjs/toolkit';
import appSlice from './reducers/appSlice';
import { doomerApi } from './reducers/doomerApi';

const store = configureStore({
  reducer: {
    appState: appSlice,
    [doomerApi.reducerPath]: doomerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(doomerApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
