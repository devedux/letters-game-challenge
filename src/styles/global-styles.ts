import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .flex {
    display: flex;
  }
  .align-end {
    align-items: flex-end;
  }
  .gap-20 {
    gap: 20px;
  }
  .mx-700 {
    max-width: 700px;
  }
  .w100 {
    width: 100%;
  }
  .h100 {
    height: 100%;
  }
`

export default GlobalStyle