import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { doc, updateDoc } from 'firebase/firestore';
import { auth, dbService } from '../firebase/firebase';

import styled from 'styled-components';
import { FormWrapper } from '../styles/common/auth';
import { useUserInfoStore } from '../stores/useUserInfoStore';

const autoKeyword = [
  '배경화면',
  '자연',
  '3D렌더링',
  '식음료',
  '비즈니스',
  '건강',
  '스포츠',
  '필름',
  '여행',
  '흑백',
];

const Wrapper = styled(FormWrapper)``;

const Form = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.spacing6};
`;

const Input = styled.input`
  flex: 1;
  height: 5rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.base};
  border-radius: ${(props) => props.theme.shape.small};
`;

const Button = styled.button`
  min-width: 14rem;
  height: 5rem;
  padding: ${(props) => props.theme.spacing.spacing1};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.baseWhite};
  border-radius: ${(props) => props.theme.shape.small};
  font-weight: ${(props) => props.theme.fonts.weightMedium};
  font-size: ${(props) => props.theme.fonts.bodyMedium};
  margin-left: ${(props) => props.theme.spacing.spacing1};
`;

const KeywordWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* margin-bottom: ${(props) => props.theme.spacing.spacing6}; */
`;

const KeywordItem = styled.li`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;
  height: 4rem;
  padding: 0.6rem 3rem 0.6rem 1rem;
  margin: 0.6rem;
  border-radius: 4rem;
  background-color: ${(props) => props.theme.colors.baseWhite};
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-weight: ${(props) => props.theme.fonts.weightMedium};
  font-size: ${(props) => props.theme.fonts.bodyMedium};
  border: 1px solid ${(props) => props.theme.colors.secondary};
`;

const KeywordDeleteBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-size: 0;
  width: 3rem;
  height: 3rem;
  background: url('/images/icon_keyword_delete.svg') center no-repeat;
  background-size: 2.4rem;
  padding: 0;
`;

const BtnWrapper = styled.div`
  margin-top: ${(props) => props.theme.spacing.spacing6};
`;

export default function Category() {
  const [value, setValue] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const user = auth.currentUser;
  const setCategory = useUserInfoStore((state) => state.setCategory);

  const navigation = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleAddClick = () => {
    if (keywords.length < 10) {
      setKeywords([value, ...keywords]);
      setValue('');
    } else {
      alert('키워드는 최대 10개까지만 추가됩니다.');
    }
  };

  const onDeleteClick = (value: string) => {
    const filterKeywords = keywords.filter((keyword) => keyword !== value);
    setKeywords([...filterKeywords]);
  };

  const onCreateKeywords = async (type: string) => {
    if (isLoading || !user) return;
    try {
      setCategory(type !== 'auto' ? [...keywords] : autoKeyword);
      const docRef = doc(dbService, 'users', user.uid);
      await updateDoc(docRef, {
        category: type !== 'auto' ? [...keywords] : autoKeyword,
      });
      navigation('/', { replace: true });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Form>
        <Input
          type="text"
          placeholder="키워드를 입력해주세요."
          value={value}
          onChange={handleChange}
        />
        <Button type="button" onClick={handleAddClick}>
          키워드 추가
        </Button>
      </Form>
      {keywords.length ? (
        <KeywordWrapper>
          {keywords.map((keyword, idx) => {
            const key = `${keyword}-${idx}`;
            return (
              <KeywordItem key={key}>
                {keyword}
                <KeywordDeleteBtn
                  type="button"
                  onClick={() => onDeleteClick(keyword)}
                >
                  삭제버튼
                </KeywordDeleteBtn>
              </KeywordItem>
            );
          })}
        </KeywordWrapper>
      ) : (
        <p>키워드를 입력해주세요.</p>
      )}
      <BtnWrapper>
        <Button type="button" onClick={() => onCreateKeywords('auto')}>
          카테고리 자동 생성
        </Button>
        <Button type="button" onClick={() => onCreateKeywords('new')}>
          카테고리 생성
        </Button>
      </BtnWrapper>
    </Wrapper>
  );
}
