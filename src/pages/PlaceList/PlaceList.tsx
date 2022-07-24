import React, { useEffect, useState } from 'react'
import { getPlaces } from '@/store/slices/place'
import { useAppDispatch } from '@/hooks'
import { BaseResponse, GetPlacesResponse } from '@/interfaces/response'
import { ChevronRight, Search } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import Button from '@/components/Button'
import Card from 'react-bootstrap/Card'
import Header from '@/components/Header'
import Pagination from '@/components/Pagination'
import styled, { css } from 'styled-components'
import constant from '@/config/constant'
import debounce from '@/util/debouncer'

const { page } = constant

const addPlaceBtnStyle = css`
  text-decoration: none;
  color: #FFF;

  &:hover {
    color: #FFF;
  }
`

const Container = styled.div`
  width: 100%;
  padding: 0 50px;
  margin: 25px 0;
  display: flex;
  flex-direction: column;
`

const PlaceLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  color: #000;

  &:hover {
    color: #000;
  }
`

const SearchBar = styled.div`
  padding: 12px;
  border: 1px solid #CCC;
  border-radius: 8px;
  display: flex;
  align-items: center;
  width: 30%;
`

const PlaceList: React.FC = () => {
  const dispatch = useAppDispatch()
  const [places, setPlaces] = useState<GetPlacesResponse[]>([])
  const [pagination, setPagination] = useState<BaseResponse<GetPlacesResponse[]>['paging']>()
  const [keyword, setKeyword] = useState<string>('')

  const fetchPlaces = async (page: number) => {
    const places = await dispatch(getPlaces({ page, keyword })).unwrap()
    setPlaces(places.data)
    setPagination(places.paging)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(() => setKeyword(e.target.value), 300)
  }

  useEffect(() => {
    fetchPlaces(1)
  }, [keyword]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Header title="PLACES" />

      <div css={`display: flex; justify-content: space-between; align-items: center;`}>
        <SearchBar>
          <Search />
          <input
            type="text"
            placeholder="Search place"
            css={`outline: none; border: none; margin-left: 10px; width: 100%;`}
            onChange={handleSearch}
          />
        </SearchBar>

          <Button css={`width: 15%;`}>
            <Link to={page.createPlace} css={addPlaceBtnStyle}>
              Add Place
            </Link>
          </Button>
      </div>


      <div css={`margin-top: 25px;`}>
        {
          places?.map(place => (
            <Card key={place.id} css={`
              margin-bottom: 10px;
              cursor: pointer;
            `}>
                <PlaceLink to={page.placeDetail.replace(':placeId', place.id)}>
                  <Card.Body css={`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}>
                    {place.name}
                    <ChevronRight />
                  </Card.Body>
                </PlaceLink>
            </Card>
          ))
        }
      </div>

      <div css={`
        margin-top: 16px;
        align-self: end;
      `}>
        {
          !!places.length && pagination?.page && (
            <Pagination
              current={pagination.page}
              totalPage={pagination.totalPage || 0}
              changePage={fetchPlaces}
            />
          )
        }
      </div>
    </Container>
  )
}

export default PlaceList
