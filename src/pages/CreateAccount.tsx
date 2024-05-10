import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { FirebaseError } from 'firebase/app';
import { createUser } from '../firebase/firebaseApi';

import TextField from '../components/form/TextField';
import Button from '../components/ui/Button';
import ErrorBox from '../components/form/ErrorBox';
import LoadingScreen from '../components/LoadingScreen';

import { initFormState } from '../types/form/auth';

import {
  booleanChk,
  emailValidationCheck,
  nameValidationCheck,
  passwordValidationCheck,
  passwordValidationMatchCheck,
} from '../utils/validation';

const FormWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 102.4rem;
  height: 100vh;
  margin: 0 auto;
`;

const Title = styled.h2`
  width: 100%;
  font-size: ${(props) => props.theme.fonts.headingMedium};
  font-weight: ${(props) => props.theme.fonts.weightBold};
  margin: ${(props) => props.theme.spacing.spacing3} auto
    ${(props) => props.theme.spacing.spacing1};
`;

const ImageBox = styled.figure`
  width: 9rem;
  margin: 0 auto;
  img {
    width: 100%;
  }
`;

const Switcher = styled.p`
  text-align: center;
  vertical-align: middle;
  a {
    color: ${(props) => props.theme.colors.base};
    text-decoration: underline;
    font-weight: ${(props) => props.theme.fonts.weightMedium};
  }
`;

export default function CreateAccount() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(initFormState);
  const [name, setName] = useState(initFormState);
  const [password, setPassword] = useState(initFormState);
  const [passwordChk, setPasswordChk] = useState(initFormState);

  const navigation = useNavigate();

  const changeEmail = (value: string) => {
    setEmail({
      text: value,
      isValid: booleanChk(emailValidationCheck(value)),
      message: emailValidationCheck(value),
    });
  };

  const changeName = (value: string) => {
    setName({
      text: value,
      isValid: booleanChk(nameValidationCheck(value)),
      message: nameValidationCheck(value),
    });
  };

  const changePassword = (value: string) => {
    setPassword({
      text: value,
      isValid: booleanChk(passwordValidationCheck(value)),
      message: passwordValidationCheck(value),
    });
  };

  const changePasswordChk = (value: string) => {
    setPasswordChk({
      text: value,
      isValid: booleanChk(passwordValidationMatchCheck(value, password.text)),
      message: passwordValidationMatchCheck(value, password.text),
    });
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (
      isLoading ||
      email.text === '' ||
      name.text === '' ||
      password.text === '' ||
      passwordChk.text === ''
    )
      return;

    try {
      setLoading(true);
      await createUser(email.text, password.text, name.text);
      navigation('/', { replace: true });
    } catch (e) {
      if (e instanceof FirebaseError) {
        //console.log(e.code, e.message);
        setError(e.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper>
      <div>
        <ImageBox>
          <img src="/images/logo.svg" alt="logo" />
        </ImageBox>
        <Title>FilterSplash 회원가입</Title>
        <Switcher>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </Switcher>
      </div>
      <form onSubmit={onsubmit}>
        <TextField
          label="이메일"
          type="text"
          name="text"
          placeholder="email@mail.com"
          value={email.text}
          isValid={email.isValid}
          message={email.message}
          onChange={changeEmail}
        />
        <TextField
          label="이름"
          type="text"
          name="name"
          placeholder="사용자 이름을 입력해주세요."
          value={name.text}
          isValid={name.isValid}
          message={name.message}
          onChange={changeName}
        />
        <TextField
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={password.text}
          isValid={password.isValid}
          message={password.message}
          onChange={changePassword}
          isShowPw={true}
        />
        <TextField
          label="비밀번호 확인"
          type="password"
          name="passwordChk"
          placeholder="비밀번호를 다시 한번 입력해주세요."
          value={passwordChk.text}
          isValid={passwordChk.isValid}
          message={passwordChk.message}
          onChange={changePasswordChk}
          isShowPw={true}
        />
        {error !== '' && <ErrorBox text={error} />}
        <Button type="submit" text={'회원가입'} />
      </form>
      {isLoading && <LoadingScreen />}
    </FormWrapper>
  );
}
