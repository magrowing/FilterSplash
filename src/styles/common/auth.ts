import { styled } from 'styled-components';

export const FormWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 102.4rem;
  height: 100vh;
  margin: 0 auto;
`;

export const Title = styled.h2`
  width: 100%;
  font-size: ${(props) => props.theme.fonts.headingMedium};
  font-weight: ${(props) => props.theme.fonts.weightBold};
  margin: ${(props) => props.theme.spacing.spacing3} auto
    ${(props) => props.theme.spacing.spacing1};
  text-align: center;
`;

export const ImageBox = styled.figure`
  width: 9rem;
  margin: 0 auto;
  img {
    width: 100%;
  }
`;

export const Switcher = styled.p`
  text-align: center;
  vertical-align: middle;
  a {
    color: ${(props) => props.theme.colors.base};
    text-decoration: underline;
    font-weight: ${(props) => props.theme.fonts.weightMedium};
  }
`;


export const SwitcherSmall = styled(Switcher)`
  text-align: right;
  font-size: ${(props) => props.theme.fonts.bodySmall};
  a {
    font-size: ${(props) => props.theme.fonts.bodySmall};
    margin-left: 0.6rem;
  }
`;