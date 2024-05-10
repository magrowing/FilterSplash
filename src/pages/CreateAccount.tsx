import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { auth } from '../firebase/firebase';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import TextField from '../components/form/TextField';

import {
  booleanChk,
  emailValidationCheck,
  nameValidationCheck,
  passwordValidationCheck,
  passwordValidationMatchCheck,
} from '../utils/validation';
import ErrorBox from '../components/form/ErrorBox';
import LoadingScreen from '../components/LoadingScreen';

const Wrapper = styled.article`
  width: 100%;
  max-width: 102.4rem;
  margin: 0 auto;
`;

const TitleSection = styled.section``;

const Image = styled.img`
  width: 100%;
`;

const Title = styled.h2`
  width: 100%;
  max-width: 102.4rem;
  margin: 0 auto;
  font-size: ${(props) => props.theme.fonts.headingMedium};
  font-weight: ${(props) => props.theme.fonts.weightBold};
`;

const Form = styled.form``;

export default function CreateAccount() {
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigate();

  const [email, setEmail] = useState({
    text: '',
    isVaild: false,
    message: '',
  });

  const [name, setName] = useState({
    text: '',
    isVaild: false,
    message: '',
  });

  const [password, setPassword] = useState({
    text: '',
    isVaild: false,
    message: '',
  });

  const [passwordChk, setPasswordChk] = useState({
    text: '',
    isVaild: false,
    message: '',
  });

  const changeEmail = (value: string) => {
    setEmail({
      text: value,
      isVaild: booleanChk(emailValidationCheck(value)),
      message: emailValidationCheck(value),
    });
  };

  const changeName = (value: string) => {
    setName({
      text: value,
      isVaild: booleanChk(nameValidationCheck(value)),
      message: nameValidationCheck(value),
    });
  };

  const changePassword = (value: string) => {
    setPassword({
      text: value,
      isVaild: booleanChk(passwordValidationCheck(value)),
      message: passwordValidationCheck(value),
    });
  };

  const changePasswordChk = (value: string) => {
    setPasswordChk({
      text: value,
      isVaild: booleanChk(passwordValidationMatchCheck(value, password.text)),
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
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email.text,
        password.text
      );
      await updateProfile(credentials.user, { displayName: name.text });
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
    <Wrapper>
      <TitleSection>
        <Image src="" alt="logo" />
        <Title>회원가입</Title>
      </TitleSection>
      <Form onSubmit={onsubmit}>
        <TextField
          label="이메일"
          type="text"
          name="email"
          placeholder="email@mail.com"
          value={email.text}
          isVaild={email.isVaild}
          message={email.message}
          onChange={changeEmail}
        />
        <TextField
          label="이름"
          type="text"
          name="name"
          placeholder="사용자 이름을 입력해주세요."
          value={name.text}
          isVaild={name.isVaild}
          message={name.message}
          onChange={changeName}
        />
        <TextField
          label="비밀번호"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          value={password.text}
          isVaild={password.isVaild}
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
          isVaild={passwordChk.isVaild}
          message={passwordChk.message}
          onChange={changePasswordChk}
          isShowPw={true}
        />
        {error !== '' && <ErrorBox text={error} />}
        <button type="submit">회원가입</button>
      </Form>
      {isLoading && <LoadingScreen />}
    </Wrapper>
  );
}
