/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';

import { styled } from 'styled-components';

import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, dbService, storageService } from '../../firebase/firebase';

import Button from '../ui/Button';
import TextField from '../form/TextField';

import { useUserInfoStore } from '../../stores/useUserInfoStore';

import { booleanChk, nameValidationCheck } from '../../utils/validation';

import { initFormState } from '../../types/form/auth';

const UserInfoForm = styled.form``;

const UserInfoImage = styled.div`
  position: relative;
`;

const UserInfoField = styled.div`
  width: 100%;
`;

const FormFieldBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4rem;
`;

const ImageBox = styled.figure`
  width: 15rem;
  height: 15rem;
  border: 1px solid ${(props) => props.theme.colors.third};
  border-radius: 100%;
  overflow: hidden;

  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }
`;

const ImageEditLabel = styled.label`
  position: absolute;
  bottom: 0;
  right: 0%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 0;
  border: 1px solid ${(props) => props.theme.colors.third};
  background-color: ${(props) => props.theme.colors.baseWhite};
  border-radius: 100%;
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${(props) => props.theme.colors.secondary};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};

    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`;

const ImageEditInput = styled.input`
  display: none;
`;

const FieldBox = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: ${(props) => props.theme.fonts.bodyMedium};
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: 4rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.base};
  border-radius: ${(props) => props.theme.shape.small};

  &::placeholder {
    color: ${(props) => props.theme.colors.base};
  }

  &:disabled,
  &:read-only {
    background-color: ${(props) => props.theme.colors.baseGray};
    border-color: ${(props) => props.theme.colors.baseGray};
    color: ${(props) => props.theme.colors.secondary};
  }
`;

const UserInfoUpdateButton = styled(Button)`
  font-size: ${(props) => props.theme.fonts.bodyMedium};
`;

export default function UserProfileUpdate() {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState(initFormState);
  const [file, setFile] = useState<File>();
  const user = useUserInfoStore((state) => state.user);
  const setUser = useUserInfoStore((state) => state.setUser);
  const currentUser = auth.currentUser;

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!currentUser) return;

    if (files && files.length === 1) {
      const file = files[0];

      if (file.size > 1024 * 1024 * 1) {
        alert('최대 1MB까지 업로드 가능합니다.');
        e.target.value = ''; // 동일한 파일할 경우도 있으므로
        return;
      }
      setFile(file);
      setUser({ ...user, image: URL.createObjectURL(file) });
    }
  };

  const changeName = (value: string) => {
    setName({
      text: value,
      isValid: booleanChk(nameValidationCheck(value)),
      message: nameValidationCheck(value),
    });
    setUser({ ...user, name: value });
  };

  const onUpdateSuBmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const confirmChk = confirm('계정을 업데이트 하시겠습니까?');

    if (!currentUser || !confirmChk) return;

    try {
      setLoading(true);
      const docRef = doc(dbService, 'users', currentUser.uid);
      await updateDoc(docRef, {
        name: user.name,
      });

      if (file) {
        const locationRef = ref(storageService, `avatar/${currentUser.uid}`);
        const result = await uploadBytes(locationRef, file);
        const avatarUrl = await getDownloadURL(result.ref);
        await updateDoc(docRef, {
          image: avatarUrl,
        });
        await updateProfile(currentUser, {
          photoURL: avatarUrl,
        });
      }

      setUser({
        ...user,
        image: currentUser.photoURL ?? user.image,
        name: user.name,
      });
    } catch {
      console.log('Firebase Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserInfoForm onSubmit={onUpdateSuBmit}>
      <FormFieldBox>
        <UserInfoImage>
          <ImageBox>
            <img src={user.image} alt={user.name} />
          </ImageBox>
          <ImageEditLabel htmlFor="file">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
          </ImageEditLabel>
          <ImageEditInput
            type="file"
            id="file"
            accept="image/*"
            onChange={handleChangeProfileImage}
          />
        </UserInfoImage>
        <UserInfoField>
          <FieldBox>
            <Label htmlFor="Email">Email</Label>
            <Input type="text" value={user.email} readOnly />
          </FieldBox>
          <FieldBox>
            <TextField
              label="사용자 이름"
              type="text"
              name="name"
              placeholder="사용자 이름을 입력해주세요."
              value={user.name}
              isValid={name.isValid}
              message={name.message}
              onChange={changeName}
            />
          </FieldBox>
        </UserInfoField>
      </FormFieldBox>
      <UserInfoUpdateButton
        type="submit"
        text={isLoading ? `Loading....` : `계정 업데이트`}
      />
    </UserInfoForm>
  );
}
