import * as React from 'react'
import styled from 'styled-components'
import dictionary from '../data/dictionary.json'

export default function BoxLetter({word}: {word: string}) {
  const isValid = React.useMemo(() => dictionary.words.includes(word), [word]) as boolean
  return (
    <BoxLetterStyled>
      <span>{word}</span>
      <BoxValid className='is-valid' isValid={isValid}>
        {word ? isValid ? 'valid' : 'invalid' : ''}
      </BoxValid>
    </BoxLetterStyled>
  )
}

const BoxLetterStyled = styled.div`
  border: 2px solid #AAAAAA;
  width: 100%;
  padding: 1rem 1.5rem;
  color: #D0021B;
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