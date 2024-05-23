import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from 'styled-components';

import { auth, dbService } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

import { useUserInfoStore } from '../../stores/useUserInfoStore';
import { useSettingCategoriesStore } from '../../stores/useSettingCategoriesStore';

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: ${(props) => props.theme.spacing.spacing1};
`;

const Button = styled.button`
  width: 100%;
  height: 4rem;
  padding: ${(props) => props.theme.spacing.spacing1};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.baseWhite};
  border-radius: ${(props) => props.theme.shape.small};
  font-weight: ${(props) => props.theme.fonts.weightMedium};
  font-size: ${(props) => props.theme.fonts.bodyMedium};

  &:disabled {
    background-color: ${(props) => props.theme.colors.third};
    color: ${(props) => props.theme.colors.secondary};
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const WhiteButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.baseWhite};
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid ${(props) => props.theme.colors.primary};
`;

const autoKeyword = [
  '배경화면',
  '자연',
  '3D렌더링',
  '여행',
  '인테리어',
  '건축 및 인테리어',
  '텍스처 및 패턴',
  '거리사진',
  '필름',
  '패션',
  '뷰티',
  '사람',
  '비즈니스 및 업무',
  '식음료',
  '건강 및 웰빙',
  '스포츠',
];

type ButtonsProps = {
  popup?: boolean;
  onClosePopup?: () => void;
};

export default function Buttons({ popup, onClosePopup }: ButtonsProps) {
  const [isLoading, setLoading] = useState(false);
  const [isUpdateLoading, setUpdateLoading] = useState(false);
  const keywords = useSettingCategoriesStore((state) => state.keywords);
  const setCategory = useUserInfoStore((state) => state.setCategory);

  const user = auth.currentUser;
  const navigation = useNavigate();

  const onCreateKeywords = async (type: string) => {
    if (isLoading || !user) return;

    const match = type !== 'auto' ? [...keywords] : autoKeyword;

    try {
      setCategory(match);
      setUpdateLoading(true);
      const docRef = doc(dbService, 'users', user.uid);
      await updateDoc(docRef, {
        category: match,
      });
      if (popup) {
        setUpdateLoading(false);
        if (onClosePopup) {
          onClosePopup();
        }
        return;
      }
      navigation('/', { replace: true });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BtnWrapper>
      {!popup && (
        <WhiteButton type="button" onClick={() => onCreateKeywords('auto')}>
          카테고리 자동 생성
        </WhiteButton>
      )}
      <Button
        type="button"
        onClick={() => onCreateKeywords('new')}
        disabled={keywords.length === 0}
      >
        {popup
          ? `${isUpdateLoading ? 'Loading...' : '카테고리 업데이트'} `
          : '카테고리 생성'}
      </Button>
    </BtnWrapper>
  );
}
