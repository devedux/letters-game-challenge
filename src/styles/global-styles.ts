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

  .wrapper {
    display: grid;
    grid-template-columns: 400px 300px auto;
    grid-gap: 20px
  }

  .game-preview {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;

    .game-reset {
      color: #E4E4E4;
      position: relative;
      display: flex;
      gap: 10px;
      align-items: center;
      cursor: pointer;

      &::after {
        content: ' X ';
        border-radius: 50%;
        padding: 0.5rem;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #D8D8D8;
        color: #fff;
      }
    }
  }
`

export default GlobalStyle