import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background: ${({theme}) => theme.currentTheme.backgroundColor};
    color: ${({theme}) => theme.currentTheme.textColor};
    font-family: sans-serif;
  }
`;
