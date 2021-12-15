import styled from 'styled-components'
import {stylesValidation} from './board'

export default function BoxLetter({word, isValid}: {word: string, isValid: boolean}) {
  return (
    <BoxLetterStyled isValid={isValid}>
      <span>{word}</span>
      <BoxValid className='is-valid' isValid={isValid}>
        {word ? isValid ? 'valid' : 'invalid' : ''}
      </BoxValid>
    </BoxLetterStyled>
  )
}

const BoxLetterStyled = styled.div<{ isValid: boolean }>`
  border: 2px solid #AAAAAA;
  width: 100%;
  padding: 1rem 1.5rem;
  color: ${props => props.isValid ? '#7ED321' : '#D0021B'};
  font-weight: bold;
  font-size: 1.8rem;
  letter-spacing: 0.2rem;
  display: grid;
  grid-template-columns: auto 50px; 
  align-items: center;
  grid-gap: 15px;
  height: 90px;
`

const BoxValid = styled.div<{ isValid: boolean }>`
    font-size: 1rem;
    letter-spacing: initial;
    font-weight: 400;
    color: ${props => props.isValid ? '#CEDABD': '#F5C8CD'};
`

export const BoxWords = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  margin: 0;
  padding: 0;

  li {
    list-style: none;
    margin: 0.1rem;
    border: 1px solid;
    padding: 0.1rem;
    border-radius: 5px;
    cursor: default;
    text-transform: capitalize;
  }

  .match {
    background: ${stylesValidation(true)};
  }
`