import { styled } from 'styled-components';

const Error = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.dangerBorder};
  font-size: ${(props) => props.theme.fonts.bodySmall};
  background-color: ${(props) => props.theme.colors.dangerBg};
  color: ${(props) => props.theme.colors.dangerText};
  border-radius: ${(props) => props.theme.shape.small};

  svg {
    width: 1.6rem;
    height: 1.6rem;
    fill: ${(props) => props.theme.colors.dangerText};
    margin-right: 0.6rem;
  }
`;

type ErrorBox = {
  text: string;
};

function ErrorBox({ text }: ErrorBox) {
  return (
    <Error>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
      >
        <path
          fillRule="evenodd"
          d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        />
      </svg>
      {text}
    </Error>
  );
}

export default ErrorBox;
