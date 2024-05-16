import { styled } from 'styled-components';

import { useSettingCategoriesStore } from '../../stores/useSettingCategoriesStore';

const KeywordWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const KeywordItem = styled.li`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 6rem;
  height: 3rem;
  padding: 0.6rem 3rem 0.6rem 1rem;
  border-radius: 0.6rem;
  background: ${(props) => props.theme.colors.btnPrimaryBg};
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.fonts.bodySmall};
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
  background-size: 2rem;
  padding: 0;
`;

export default function Keywords() {
  const keywords = useSettingCategoriesStore((state) => state.keywords);
  const { setKeywords } = useSettingCategoriesStore((state) => state.actions);

  const onDeleteClick = (value: string) => {
    const filterKeywords = keywords.filter((keyword) => keyword !== value);
    setKeywords([...filterKeywords]);
  };

  return (
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
  );
}
