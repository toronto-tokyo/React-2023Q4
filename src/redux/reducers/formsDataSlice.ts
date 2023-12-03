import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFormData {
  name: string;
  age: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTC: string;
  imgFile: string;
  country: string;
}
interface IInitialStateData {
  uncontrolledForm: IFormData;
  reactHookForm: IFormData;
}

const initialFormData: IFormData = {
  name: '',
  age: '',
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTC: '',
  imgFile: '',
  country: '',
};

const initialState: IInitialStateData = {
  uncontrolledForm: initialFormData,
  reactHookForm: initialFormData,
};

const formsDataSlice = createSlice({
  name: 'formsData',
  initialState,
  reducers: {
    changeUncontrolledFormData(state, action: PayloadAction<IFormData>) {
      state.uncontrolledForm = action.payload;
    },
    changeReactHookFormData(state, action: PayloadAction<IFormData>) {
      state.reactHookForm = action.payload;
    },
  },
});

export default formsDataSlice.reducer;
export const { changeReactHookFormData, changeUncontrolledFormData } =
  formsDataSlice.actions;
