import { useRef } from 'react';
import { styled } from 'styled-components';

import { useSettingCategoriesStore } from '../../stores/useSettingCategoriesStore';

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.spacing0};
`;

const Input = styled.input`
  flex: 1;
  height: 4rem;
  padding: 1rem;
  font-size: ${(props) => props.theme.fonts.bodySmall};
  border: 1px solid ${(props) => props.theme.colors.base};
  border-radius: ${(props) => props.theme.shape.small};
`;

const Button = styled.button`
  min-width: 10rem;
  height: 4rem;
  padding: ${(props) => props.theme.spacing.spacing1};
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.baseWhite};
  border-radius: ${(props) => props.theme.shape.small};
  font-weight: ${(props) => props.theme.fonts.weightMedium};
  font-size: ${(props) => props.theme.fonts.bodySmall};
  margin-left: ${(props) => props.theme.spacing.spacing1};
`;

export default function Form() {
  const value = useSettingCategoriesStore((state) => state.value);
  const keywords = useSettingCategoriesStore((state) => state.keywords);
  const { setValue, setKeywords } = useSettingCategoriesStore(
    (state) => state.actions
  );

  const InputDomRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  const handleAddClick = () => {
    if (value === '') {
      InputDomRef.current?.focus();
      return;
    }
    if (keywords.length < 20) {
      const matchKeyWords = keywords.filter((keyword) => keyword !== value);
      setKeywords([value, ...matchKeyWords]);
      setValue('');
    } else {
      alert('키워드는 최대 20개까지만 추가됩니다.');
    }
  };

  return (
    <FormWrapper>
      <Input
        ref={InputDomRef}
        type="text"
        placeholder="키워드를 입력해주세요."
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button type="button" onClick={handleAddClick}>
        키워드 추가
      </Button>
    </FormWrapper>
  );
}
