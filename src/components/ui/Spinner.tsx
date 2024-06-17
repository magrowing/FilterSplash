import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
`;

const SpinnerBox = styled.p`
  width: 5rem;
  height: 5rem;
  box-sizing: border-box;

  border: 3px solid rgba(0, 0, 0, 0.3);
  border-top-color: ${(props) => props.theme.colors.primary};
  border-radius: 100%;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Spinner() {
  return (
    <Wrapper>
      <SpinnerBox></SpinnerBox>
    </Wrapper>
  );
}
