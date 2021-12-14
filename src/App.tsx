import Board from './components/board'
import GlobalStyle from './styles/global-styles';
import {ThemeProvider} from 'styled-components'
import {theme} from './styles/theme'
import {Container} from './components/container';
import BoxLetter from './components/box-letter';
import useLettersGame from './hooks/useLettersGame'

export default function App() {
  const lettersGame = useLettersGame()
  const {data: tiles, board, selectTile, word, restartGame, positions, isValid} = lettersGame

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Container prefix='layout'>
          <Container prefix='content'>
            <div className='flex gap-20 mx-700'>
              <Board
                tiles={tiles}
                board={board}
                onClick={selectTile}
                positions={positions}
                isValid={isValid}
              />
              <div className='game-preview'>
                {word.length > 0 ? (
                  <span className='game-reset' onClick={restartGame}>
                    clear word
                  </span>
                ): <span></span>}
                
                <BoxLetter word={word} isValid={isValid} />
              </div>
            </div>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
}
