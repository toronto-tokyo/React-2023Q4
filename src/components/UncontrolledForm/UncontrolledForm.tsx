import FormInput from '../UI/FormInput/FormInput';
import FormRow from '../FormRow/FormRow';
import FormRadioInput from '../UI/FormRadioInput/FormRadioInput';
import FormFileInput from '../UI/FormFileInput/FormFileInput';
import FormSelectInput from '../UI/FormSelectInput/FormSelectInput';
import { countryList } from '../../data/countries';
import FormCheckboxInput from '../UI/FormCheckboxInput/FormCheckboxInput';
import classes from './UncontrolledFrom.module.css';
import SubmitBtn from '../UI/SubmitBtn/SubmitBtn';
import { IValidationErrors } from '../../pages/UncontrolledComponents';

interface IProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  validationErrors: IValidationErrors;
}

function UncontrolledForm({ handleSubmit, validationErrors }: IProps) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={classes.uncontrolledForm}
    >
      <FormInput
        id="1"
        type="text"
        name="name"
        label="Name"
        errorMessage={validationErrors.name || undefined}
      />
      <FormInput
        id="2"
        type="number"
        name="age"
        label="Age"
        errorMessage={validationErrors.age || undefined}
      />
      <FormInput
        id="3"
        type="email"
        name="email"
        label="Email"
        errorMessage={validationErrors.email || undefined}
      />
      <FormInput
        id="4"
        type="password"
        name="password"
        label="Password"
        errorMessage={validationErrors.password || undefined}
      />
      <FormInput
        id="5"
        type="password"
        name="confirmPassword"
        label="Confirm password"
        errorMessage={validationErrors.confirmPassword || undefined}
      />
      <FormRow title="Sex" errorMessage={validationErrors.gender || undefined}>
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
        name="acceptTC"
        value="checked"
        errorMessage={validationErrors.acceptTC || undefined}
      />
      <FormFileInput
        id="9"
        label="Attach image"
        name="imgFile"
        accept=".png, .jpeg"
        errorMessage={validationErrors.imgFile || undefined}
      />
      <FormSelectInput
        id="10"
        name="country"
        labelTitle="Choose country"
        selectElements={countryList}
        errorMessage={validationErrors.country || undefined}
      />
      <SubmitBtn />
    </form>
  );
}

export default UncontrolledForm;
