import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    line-height: 1.5;
    color: ${(props) => props.theme.colors.primary};
    font-family:'Pretendard Std',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    text-decoration: none;
  }

  input,
  textarea,
  select,
  button {
    font-size: 1.6rem;
    background-color: transparent;
    color: ${(props) => props.theme.colors.primary};
    font-family:'Pretendard Std',system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  :lang(ko) {
    h1, h2, h3 {
      word-break: keep-all;
    }
  }
`; 

export default GlobalStyle;