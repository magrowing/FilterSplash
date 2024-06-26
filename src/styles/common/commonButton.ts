import { css, styled } from 'styled-components';

type CommonButtonStyleProps = {
  type?: 'button' | 'submit' | 'reset';
  image: string;
  className? : string; 
};

const CommonButton = styled.button.attrs<CommonButtonStyleProps>((props) => {
  return {
    type: props.type ?? 'button',
  };
})`
  position:relative; 
  width: 4rem;
  height: 4rem;
  padding: 0;
  font-size: 0;
  background: ${(props) => props.theme.colors.btnPrimaryBg};
  border-radius: ${(props) => props.theme.shape.small};
  border: 1px solid ${(props) => props.theme.colors.third};
  margin-left: 1rem;

  ${
    (props) => props.className === 'is_active' && css`
    background: ${props.theme.colors.success};
    border-color: ${props.theme.colors.success};
    `
  }

${
    (props) => props.className === 'is_delete' && css`
    background: ${props.theme.colors.danger};
    border-color: ${props.theme.colors.danger};
    `
  }

  &::after{
    content: ''; 
    display: inherit; 
    width : 2rem; 
    height : 2rem; 
    margin: 0 auto;
    background-image : ${(props) => props.image && `url(${props.image})`};
    background-size :cover; 
    background-repeat : no-repeat; 
    background-position :center;
  }
`;
export default CommonButton; 

