import styled from 'styled-components'

type ContainerProps = {
  prefix: 'layout' | 'content',
}
export const Container = styled.div<ContainerProps>`
  ${props => props.theme.container[props.prefix]}
  padding: 1rem;
`
