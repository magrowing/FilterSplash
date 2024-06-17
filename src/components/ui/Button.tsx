import { ReactNode } from 'react';
import { styled } from 'styled-components';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  btnStyle?: string;
  onClick?: () => void;
};

const ButtonStyle = styled.button`
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.baseWhite};
  border-radius: ${(props) => props.theme.shape.small};
  margin: ${(props) => props.theme.spacing.spacing4} 0;
  font-weight: ${(props) => props.theme.fonts.weightMedium};
  font-size: ${(props) => props.theme.fonts.bodyLarge};
`;

const TopButtonStyle = styled.button`
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 4rem;
  padding: 1rem;
  font-size: ${(props) => props.theme.fonts.bodySmall};
  color: ${(props) => props.theme.colors.secondary};
  background: ${(props) => props.theme.colors.btnPrimaryBg};
  border: 1px solid ${(props) => props.theme.colors.third};
  border-radius: ${(props) => props.theme.shape.small};

  svg {
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};
  }
`;

export default function Button({
  text,
  type,
  onClick,
  btnStyle = 'basic',
  children,
}: ButtonProps) {
  return (
    <>
      {btnStyle === 'basic' ? (
        <ButtonStyle type={type} onClick={onClick}>
          {text}
        </ButtonStyle>
      ) : (
        <TopButtonStyle type={type} onClick={onClick}>
          {children}
        </TopButtonStyle>
      )}
    </>
  );
}
