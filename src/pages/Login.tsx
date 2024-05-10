import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  FormWrapper,
  ImageBox,
  Title,
  Switcher,
  SwitcherSmall,
} from '../styles/common/auth';

import { FirebaseError } from 'firebase/app';
import { singUp } from '../firebase/firebaseApi';

import TextField from '../components/form/TextField';
import Button from '../components/ui/Button';
import ErrorBox from '../components/form/ErrorBox';
import LoadingScreen from '../components/LoadingScreen';

import { initFormState } from '../types/form/auth';

import { errorMessageChk } from '../utils/errorMessageChk';
import {
  booleanChk,
  emailValidationCheck,
  passwordValidationCheck,
} from '../utils/validation';

export default function Login() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(initFormState);
  const [password, setPassword] = useState(initFormState);
  const navigation = useNavigate();

  const changeEmail = (value: string) => {
    setEmail({
      text: value,
      isValid: booleanChk(emailValidationCheck(value)),
      message: emailValidationCheck(value),
    });
  };

  const changePassword = (value: string) => {
    setPassword({
      text: value,
      isValid: booleanChk(passwordValidationCheck(value)),
      message: passwordValidationCheck(value),
    });
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoading || email.text === '' || password.text === '') return;

    try {
      setLoading(true);
      await singUp(email.text, password.text);
      navigation('/', { replace: true });
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(errorMessageChk(e.code));
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
        <Title>FilterSplash 로그인</Title>
        <Switcher>
          계정이 없으세요? <Link to="/create-account">회원가입</Link>
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
        <SwitcherSmall>
          비밀번호를 잊으셨나요?<Link to="/find-password">비밀번호 찾기</Link>
        </SwitcherSmall>
        {error !== '' && <ErrorBox text={error} />}
        <Button type="submit" text={'로그인'} />
      </form>
      {isLoading && <LoadingScreen />}
    </FormWrapper>
  );
}
