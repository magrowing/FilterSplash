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
import { resetPassword } from '../firebase/firebaseApi';

import TextField from '../components/form/TextField';
import Button from '../components/ui/Button';
import ErrorBox from '../components/form/ErrorBox';
import LoadingScreen from '../components/LoadingScreen';

import { initFormState } from '../types/form/auth';

import { errorMessageChk } from '../utils/errorMessageChk';
import { booleanChk, emailValidationCheck } from '../utils/validation';

export default function FindPassword() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState(initFormState);
  const navigation = useNavigate();

  const changeEmail = (value: string) => {
    setEmail({
      text: value,
      isValid: booleanChk(emailValidationCheck(value)),
      message: emailValidationCheck(value),
    });
  };

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoading || email.text === '') return;

    try {
      setLoading(true);
      await resetPassword(email.text);
      navigation('/login', { replace: true });
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
        <Title>비밀번호를 잊으셨나요?</Title>
        <Switcher>
          계정과 연결된 이메일 주소를 입력하면 비밀번호를 재설정할 수 있는
          링크를 보내드립니다.
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
        <SwitcherSmall>
          비밀번호가 기억나셨나요?<Link to="/login">로그인</Link>
        </SwitcherSmall>
        {error !== '' && <ErrorBox text={error} />}
        <Button type="submit" text={'비밀번호 재설정'} />
      </form>
      {isLoading && <LoadingScreen />}
    </FormWrapper>
  );
}
