import styled from 'styled-components';

const Wrapper = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.dimmedBg};
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
`;

const Spinner = styled.p`
  margin: calc(50% - 25px) auto;
  width: 8rem;
  height: 8rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  border-top-color: ${(props) => props.theme.colors.baseWhite};
  border-radius: 100%;

  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.p`
  font-weight: ${(props) => props.theme.fonts.weightMedium};
  color: ${(props) => props.theme.colors.baseWhite};
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Container>
        <Spinner></Spinner>
        <Text>Loading...</Text>
      </Container>
    </Wrapper>
  );
}
