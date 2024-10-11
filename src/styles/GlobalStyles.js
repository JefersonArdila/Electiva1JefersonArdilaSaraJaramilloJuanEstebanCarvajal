import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

:root{
  --XHomeColor: #e7e9ea;
  --XcolorButton: #1d9bf0;
  --Hover: rgba(231, 233, 234, 0.1);
 
}
*{
margin:0;

}
  body {
  background-color: #000000;
  color: white;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  .App{
  display: flex;
  height: 100vh;
  max-width:1250px;
  margin:0 auto;
  
  }
`

export default GlobalStyle;
