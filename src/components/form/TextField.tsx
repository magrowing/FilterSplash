import { useRef, useState } from 'react';

import styled, { css } from 'styled-components';

import {
  InputProps,
  PasswordIconBtnProps,
  TextFieldProps,
} from '../../types/form/textField';

const FieldWrapper = styled.div`
  width: 100%;
  margin-top: 1.2rem;
`;

const FieldBox = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: ${(props) => props.theme.fonts.bodyMedium};
  margin-bottom: 1rem;
`;

const Input = styled.input<InputProps>`
  width: 100%;
  height: 4rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.base};
  border-radius: ${(props) => props.theme.shape.small};

  &::placeholder {
    color: ${(props) => props.theme.colors.base};
  }

  &:focus {
    border-color: ${(props) =>
      props.valid ? props.theme.colors.danger : props.theme.colors.information};
  }
`;

const PasswordIconBtn = styled.button<PasswordIconBtnProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 4rem;
  height: 4rem;
  font-size: 0;
  outline: none;
  background-image: url('/images/icon_password.svg');
  background-position: 0rem;
  background-size: cover;
  background-repeat: no-repeat;

  ${(props) =>
    props.active &&
    css`
      background-position: -4rem 0;
    `}
`;

const ValidationMsg = styled.p`
  color: ${(props) => props.theme.colors.dangerText};
  font-size: ${(props) => props.theme.fonts.bodySmall};
  margin-top: 0.6rem;
`;

function TextField({
  label,
  type,
  name,
  placeholder,
  value,
  isValid,
  message,
  onChange,
  isShowPw,
}: TextFieldProps) {
  const idRef = useRef(`textbox-${Math.random().toString().slice(2)}`);
  const [toggleType, setToggleType] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) {
      return;
    }
    onChange(event.target.value);
  };

  const handleClick = () => {
    setToggleType(!toggleType);
  };

  return (
    <FieldWrapper>
      <FieldBox>
        <Label htmlFor={idRef.current}>{label}</Label>
        <Input
          type={toggleType ? 'text' : type}
          name={name}
          placeholder={placeholder}
          id={idRef.current}
          value={value}
          onChange={handleChange}
          $valid={isValid}
        />
        {isShowPw && (
          <PasswordIconBtn
            type="button"
            onClick={handleClick}
            active={toggleType}
          >
            눈모양 아이콘
          </PasswordIconBtn>
        )}
      </FieldBox>
      <ValidationMsg>{isValid && message}</ValidationMsg>
    </FieldWrapper>
  );
}

export default TextField;
