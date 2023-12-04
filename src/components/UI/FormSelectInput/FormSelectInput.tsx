import { useState, useRef } from 'react';
import classes from './FormSelectInput.module.css';
import FormErrorLine from '../../FormErrorLine/FormErrorLine';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  labelTitle: string;
  id: string;
  selectElements: string[];
  name?: string;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
}

function FormSelectInput({
  labelTitle,
  id,
  selectElements,
  name,
  errorMessage,
  register,
}: IProps) {
  const [listElements, setListElements] = useState<string[] | null>();
  const [ariaActiveDescendant, setAriaActiveDescendant] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [registerInputValue, setRegisterInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    register && setRegisterInputValue(inputValue);
    const suitableListElements = selectElements.filter((element) =>
      element.toLowerCase().includes(inputValue.toLowerCase())
    );
    setListElements(suitableListElements);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const inputValue = e.target.value;
    const suitableListElements = selectElements.filter((element) =>
      element.toLowerCase().includes(inputValue.toLowerCase())
    );
    setListElements(suitableListElements);
  };

  const handleBlur = () => {
    if (!register && inputRef.current) {
      inputRef.current.value = ariaActiveDescendant;
    }
    setRegisterInputValue(ariaActiveDescendant);
    setListElements(null);
  };

  const handleMouseOver = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    if (e.target instanceof HTMLElement) {
      const targetValue = e.target.dataset.country;
      setAriaActiveDescendant(targetValue || '');
    }
  };

  const handleMouseLeave = () => {
    setAriaActiveDescendant('');
  };

  return (
    <div className={classes.wrapper}>
      <label htmlFor={id} className={classes.label}>
        {labelTitle}
      </label>
      {register ? (
        <input
          id={id}
          {...{
            ...register,
            onChange: (e) => handleChange(e),
            onBlur: () => handleBlur(),
          }}
          value={registerInputValue}
          type="text"
          className={classes.input}
          onFocus={handleFocus}
          autoComplete="off"
          aria-activedescendant={ariaActiveDescendant}
        />
      ) : (
        <input
          id={id}
          ref={inputRef}
          name={name}
          type="text"
          className={classes.input}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          aria-activedescendant={ariaActiveDescendant}
        />
      )}

      {errorMessage && <FormErrorLine>{errorMessage}</FormErrorLine>}
      <ul
        className={classes.selectElementsList}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {listElements &&
          listElements.map((item) => (
            <li
              className={classes.selectElement}
              key={`${item}`}
              data-country={item}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FormSelectInput;
