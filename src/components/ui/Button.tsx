import { styled } from 'styled-components';

type ButtonProps = {
  type: 'button' | 'submit' | 'reset';
  text?: string;
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

export default function Button({ text, type }: ButtonProps) {
  return <ButtonStyle type={type}>{text}</ButtonStyle>;
}
