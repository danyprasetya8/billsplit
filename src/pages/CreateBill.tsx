import { Container } from '@/util/style'
import { getPlaceAutoSuggest } from '@/store/slices/place'
import { useAppDispatch } from '@/hooks'
import { GetPlaceAutoSuggestResponse } from '@/interfaces/response'
import { DropdownItem } from '@/interfaces'
import { Line, SearchBar } from '@/util/style'
import { Search } from 'react-bootstrap-icons'
import { css } from 'styled-components'
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Dropdown from '@/components/Dropdown'
import Header from '@/components/Header'
import constant from '@/config/constant'
import styled from 'styled-components'

const { page } = constant

const marginStyle = css`
  margin: 32px 0;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #FFF;

  &:hover {
    color: #FFF;
  }
`

const CreateBill: React.FC = () => {
  const dispatch = useAppDispatch()

  const [places, setPlaces] = useState<GetPlaceAutoSuggestResponse[]>([])
  const [selectedPlace, setSelectedPlace] = useState<DropdownItem>()

  const fetchPlaces = async () => {
    const placesResponse = await dispatch(getPlaceAutoSuggest()).unwrap()
    setPlaces(placesResponse.data)
  }

  useEffect(() => {
    fetchPlaces()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toDropdownItems = places.map(place => ({
    id: place.id,
    value: place.name
  }))

  return (
    <Container>
      <Header title="SPLIT BILL " />

      <div className="mb-2">
        Places
      </div>

      {
        !!places.length && (
          <Dropdown
            placeholder="Select place"
            items={toDropdownItems}
            selectItem={setSelectedPlace}
          />
        )
      }

      <Line css={marginStyle} />

      {
        !!selectedPlace?.id && (
          <div className="d-flex justify-content-between">
            <div className="d-flex" css={`width: 30%;`}>
              <Button className="w-50 me-2">
                <StyledLink to={page.addPerson.replace(':placeId', selectedPlace.id)}>
                  Add Person
                </StyledLink>
              </Button>
              <Button
                className="w-50"
                variant="primary-outline-d"
              >
                Split Evenly
              </Button>
            </div>

            <SearchBar>
              <Search />
              <input
                type="text"
                placeholder="Search person"
                css={`outline: none; border: none; margin-left: 10px; width: 100%;`}
              />
            </SearchBar>
          </div>
        )
      }
    </Container>
  )
}

export default CreateBill