import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 0 50px;
  margin: 25px 0;
  display: flex;
  flex-direction: column;
`

export const SearchBar = styled.div`
  padding: 12px;
  border: 1px solid #CCC;
  border-radius: 8px;
  display: flex;
  align-items: center;
  width: 30%;
`

interface LineProps {
  color?: string
}

export const Line = styled.div<LineProps>`
  width: 100%;
  height: 4px;
  background-color: ${props => props.color ? props.color : '#F5F5F5'};
  margin: 15px 0 25px;
`
