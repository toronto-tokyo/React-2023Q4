import FormInput from '../UI/FormInput/FormInput';
import FormRow from '../FormRow/FormRow';
import FormRadioInput from '../UI/FormRadioInput/FormRadioInput';
import FormFileInput from '../UI/FormFileInput/FormFileInput';
import FormSelectInput from '../UI/FormSelectInput/FormSelectInput';
import { countryList } from '../../data/countries';
import FormCheckboxInput from '../UI/FormCheckboxInput/FormCheckboxInput';
import classes from './UncontrolledFrom.module.css';
import SubmitBtn from '../UI/SubmitBtn/SubmitBtn';

interface IProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function UncontrolledForm({ handleSubmit }: IProps) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={classes.uncontrolledForm}
    >
      <FormInput id="1" type="text" name="name" label="Name" />
      <FormInput id="2" type="number" name="age" label="Age" />
      <FormInput id="3" type="email" name="email" label="Email" />
      <FormInput id="4" type="password" name="password" label="Password" />
      <FormInput
        id="5"
        type="password"
        name="confirmPassword"
        label="Confirm password"
      />
      <FormRow title="Sex">
        <FormRadioInput
          id="6"
          type="radio"
          label="Male"
          name="gender"
          value="male"
        />
        <FormRadioInput
          id="7"
          type="radio"
          label="Female"
          name="gender"
          value="female"
        />
      </FormRow>
      <FormCheckboxInput
        id="8"
        type="checkbox"
        label="Accept T&C"
        name="acceptT&C"
        value="checked"
      />
      <FormFileInput
        id="9"
        label="Attach image"
        name="imgFile"
        accept=".png, .jpeg"
      />
      <FormSelectInput
        id="10"
        name="country"
        labelTitle="Choose country"
        selectElements={countryList}
      />
      <SubmitBtn />
    </form>
  );
}

export default UncontrolledForm;
