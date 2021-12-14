import Board from './components/board'
import GlobalStyle from './styles/global-styles';
import {ThemeProvider} from 'styled-components'
import {theme} from './styles/theme'
import {Container} from './components/container';
import BoxLetter from './components/box-letter';
import useLettersGame from './hooks/useLettersGame'

export default function App() {
  const lettersGame = useLettersGame()
  const {data: tiles, board, selectTile, word} = lettersGame

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Container prefix='layout'>
          <Container prefix='content'>
            <div className='flex gap-20 align-end mx-700'>
              <Board
                tiles={tiles}
                board={board}
                onClick={selectTile}
                word={word}
              />
              <div className='w100 h100'>
                <BoxLetter word={word} />
              </div>
            </div>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
}
