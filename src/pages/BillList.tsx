import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/hooks'
import { ChevronRight, Search } from 'react-bootstrap-icons'
import { Container, SearchBar } from '@/util/style'
import { BaseResponse, GetBillsResponse } from '@/interfaces/response'
import { getBills } from '@/store/slices/bill'
import { Link } from 'react-router-dom'
import Button from '@/components/Button'
import Card from 'react-bootstrap/Card'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'
import constant from '@/config/constant'
import styled, { css } from 'styled-components'

const { page } = constant

const addBillBtnStyle = css`
  text-decoration: none;
  color: #FFF;

  &:hover {
    color: #FFF;
  }
`

const BillLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #000;

  &:hover {
    color: #000;
  }
`

const BillList = () => {
  const dispatch = useAppDispatch()
  const [keyword, setKeyword] = useState<string>('')
  const [bills, setBills] = useState<GetBillsResponse[]>()
  const [pagination, setPagination] = useState<BaseResponse<GetBillsResponse[]>['paging']>()

  const fetchBills = async (page: number): Promise<void> => {
    const bills = await dispatch(getBills({ page, keyword })).unwrap()
    setBills(bills.data)
    setPagination(bills.paging)
  }

  useEffect(() => {
    fetchBills(1)
  }, [keyword]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Header title="SPLIT BILL" />

      <div css={`display: flex; justify-content: space-between; align-items: center;`}>
        <SearchBar>
          <Search />
          <input
            type="text"
            placeholder="Search bill"
            css={`outline: none; border: none; margin-left: 10px; width: 100%;`}
            onChange={e => setKeyword(e.target.value)}
          />
        </SearchBar>

        <Button css={`width: 15%;`}>
          <Link to={page.createPlace} css={addBillBtnStyle}>
            Add Bill
          </Link>
        </Button>
      </div>

      <div css={`margin-top: 25px;`}>
        {
          bills?.map(bill => (
            <Card key={bill.id} css={`
              margin-bottom: 10px;
              cursor: pointer;
            `}>
                <BillLink to={page.billDetail.replace(':billId', bill.id)}>
                  <Card.Body css={`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}>
                    {bill.placeName}
                    <ChevronRight />
                  </Card.Body>
                </BillLink>
            </Card>
          ))
        }
      </div>

      <div css={`
        margin-top: 16px;
        align-self: end;
      `}>
        {
          !!bills?.length && pagination?.page && (
            <Pagination
              current={pagination.page}
              totalPage={pagination.totalPage || 0}
              changePage={fetchBills}
            />
          )
        }
      </div>
    </Container>
  )
}

export default BillList
