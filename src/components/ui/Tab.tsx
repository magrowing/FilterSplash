import { ReactNode } from 'react';

import styled from 'styled-components';

const TabBox = styled.p`
  display: inline-flex;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.primary};

  svg {
    width: 1.6rem;
    height: 1.6rem;
    fill: ${(props) => props.theme.colors.primary};
  }

  span {
    font-size: ${(props) => props.theme.fonts.bodySmall};
    color: ${(props) => props.theme.colors.primary};
    margin: 0 0.5rem;
  }
`;

type TabProps = {
  children: ReactNode;
  text: string;
  count: number;
};

export default function Tab({ children, text, count }: TabProps) {
  return (
    <TabBox>
      {children} <span>{text}</span> <span>{count}</span>
    </TabBox>
  );
}
