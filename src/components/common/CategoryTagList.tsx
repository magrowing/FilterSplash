import { styled } from 'styled-components';

import { useUserInfoStore } from '../../stores/useUserInfoStore';

const TagList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const TagItem = styled.li`
  padding: ${(props) => props.theme.shape.small};
  margin-right: ${(props) => props.theme.shape.small};
  margin-bottom: 0.6rem;
  color: ${(props) => props.theme.colors.secondary};
  background-color: ${(props) => props.theme.colors.baseGray};
  font-size: ${(props) => props.theme.fonts.bodySmall};
  border-radius: ${(props) => props.theme.shape.small};
`;

export default function CategoryTagList() {
  const category = useUserInfoStore((state) => state.category);
  return (
    <TagList>
      {category.map((item) => (
        <TagItem key={`tag-${item}`}>{item}</TagItem>
      ))}
    </TagList>
  );
}
