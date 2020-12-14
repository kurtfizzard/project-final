import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`

:focus{
 outline: none; 
}

${reset};

body{
    background: #E5E5E5;
    font-family: 'Monospace', sans-serif;
    line-height: auto;
}

a{
    text-decoration: none;

    &:visited {
    color: black;
  }
}

`;

export default GlobalStyle;
