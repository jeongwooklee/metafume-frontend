import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    background-color: #FFF6F0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default GlobalStyle;
