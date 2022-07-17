import { ChevronLeft, ChevronRight } from 'react-bootstrap-icons'
import React from 'react'
import styled, { css } from 'styled-components'

interface PageProps {
  active?: boolean,
  onClick?: (page: number) => void
}

const Page = styled.div<PageProps>`
  padding: 4px 6px;
  margin: 0 6px;
  font-weight: ${props => props.active ? 800 : 500};
  cursor: ${props => !props.active && 'pointer'};
  border-radius: 100%;
`

interface Props {
  current: number,
  totalPage: number,
  changePage: (page: number) => void
}

const Pagination: React.FC<Props> = props => {
  const { current, totalPage, changePage } = props

  const setPage = (page: number) => {
    if (page < 1) return
    if (page > totalPage) return
    changePage(page)
  }

  return (
    <div css={`display: flex; align-items: center;`}>
      <ChevronLeft
        onClick={() => setPage(current - 1)}
        css={`cursor: pointer;`}
      />

      {
        current - 3 > 0 && (
          <>
            <Page onClick={() => setPage(1)}>
              1
            </Page>
            <Page>
              ...
            </Page>
          </>
        )
      }

      {
        current - 2 > 0 && (
          <Page onClick={() => setPage(current - 2)}>
            {current - 2}
          </Page>
        )
      }

      {
        current - 1 > 0 && (
          <Page onClick={() => setPage(current - 1)}>
            {current - 1}
          </Page>
        )
      }

      <Page active>
        {current}
      </Page>

      {
        current + 1 <= totalPage && (
          <Page onClick={() => setPage(current + 1)}>
            {current + 1}
          </Page>
        )
      }

      {
        current + 2 <= totalPage && (
          <Page onClick={() => setPage(current + 2)}>
            {current + 2}
          </Page>
        )
      }

      {
        current + 3 <= totalPage && (
          <>
            <Page>
              ...
            </Page>
            <Page onClick={() => setPage(totalPage)}>
              {totalPage}
            </Page>
          </>
        )
      }

      <ChevronRight
        onClick={() => setPage(current + 1)}
        css={`cursor: pointer;`}
      />
    </div>
  )
}

export default Pagination
