import { ChevronLeft } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #00ADB5;
`

const Line = styled.div`
  width: 100%;
  height: 4px;
  background-color: #00ADB5;
  margin: 15px 0 25px;
`

interface Props {
  title: string | undefined,
  backUrl?: string
}

const Header: React.FC<Props> = props => {
  return (
    <>
      <div css={`
        display: flex;
        align-items: center;
      `}>
        {
          props.backUrl && (
            <Link to={props.backUrl}>
              <ChevronLeft color="#00ADB5" size={20} css={`
                cursor: pointer;
                margin-right: 8px;
              `} />
            </Link>
          )
        }

        <Title>
          {props.title || ''}
        </Title>
      </div>

      <Line />
    </>
  )
}

export default Header