import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../Validations/formsValidation';
import FormInput from '../UI/FormInput/FormInput';
import FormRow from '../FormRow/FormRow';
import FormRadioInputs from '../UI/FormRadioInput/FormRadioInput';
import FormCheckboxInput from '../UI/FormCheckboxInput/FormCheckboxInput';
import FormFileInput from '../UI/FormFileInput/FormFileInput';
import FormSelectInput from '../UI/FormSelectInput/FormSelectInput';
import { countryList } from '../../data/countries';
import { IFormData } from '../../Validations/formsValidation';
import { useAppDispatch } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { changeReactHookFormData } from '../../redux/reducers/formsDataSlice';
import classes from './ReactHookForm.module.css';

function ReactHookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    const imgFile = (data.imgFile as FileList)[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64Img = reader.result as string;
      dispatch(changeReactHookFormData({ ...data, imgFile: base64Img }));
      navigate('/');
    };
    reader.readAsDataURL(imgFile);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.reactHookForm}>
      <FormInput
        id="1"
        type="text"
        register={{ ...register('name') }}
        label="Name"
        errorMessage={errors.name?.message}
      />
      <FormInput
        id="2"
        type="number"
        register={{ ...register('age') }}
        label="Age"
        errorMessage={errors.age?.message}
      />
      <FormInput
        id="3"
        type="email"
        register={{ ...register('email') }}
        label="Email"
        errorMessage={errors.email?.message}
      />
      <FormInput
        id="4"
        type="password"
        register={{ ...register('password') }}
        label="Password"
        errorMessage={errors.password?.message}
      />
      <FormInput
        id="5"
        type="password"
        register={{ ...register('confirmPassword') }}
        label="Confirm password"
        errorMessage={errors.confirmPassword?.message}
      />
      <FormRow title="Sex" errorMessage={errors.gender?.message}>
        <FormRadioInputs
          id="6"
          type="radio"
          label="Male"
          register={{ ...register('gender') }}
          value="male"
        />
        <FormRadioInputs
          id="7"
          type="radio"
          label="Female"
          register={{ ...register('gender') }}
          value="female"
        />
      </FormRow>
      <FormCheckboxInput
        id="8"
        type="checkbox"
        label="Accept T&C"
        register={{ ...register('acceptTC') }}
        value="checked"
        errorMessage={errors.acceptTC?.message}
      />
      <FormFileInput
        id="9"
        label="Attach image"
        name="imgFile"
        register={{ ...register('imgFile') }}
        accept=".png, .jpeg"
        errorMessage={errors.imgFile?.message}
      />
      <FormSelectInput
        id="10"
        register={{ ...register('country') }}
        labelTitle="Choose country"
        selectElements={countryList}
        errorMessage={errors.country?.message}
      />
      <input type="submit" disabled={!isValid} />
    </form>
  );
}

export default ReactHookForm;
