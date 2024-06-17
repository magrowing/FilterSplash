import { ReactNode } from 'react';
import styled from 'styled-components';

type NoneScreenProps = {
  children: ReactNode;
  style?: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  &.full-height {
    height: calc(100vh - (6.6rem + 4.2rem));

    svg {
      margin-top: 0;
    }
  }

  svg {
    width: 10rem;
    fill: ${(props) => props.theme.colors.primary};

    margin-top: 6rem;
  }

  dl {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 1.4rem;

    dt {
      font-size: 2rem;
      font-weight: ${(props) => props.theme.fonts.weightMedium};
      margin-bottom: 0.5rem;
    }

    dd {
      color: ${(props) => props.theme.colors.base};
    }
  }
`;

export default function NoneScreen({ children, style }: NoneScreenProps) {
  return <Wrapper className={style}>{children}</Wrapper>;
}
