import { useAppDispatch } from '@/hooks'
import { useParams, Link } from 'react-router-dom'
import { getPlaceDetail } from '@/store/slices/place'
import { getMenus } from '@/store/slices/menu'
import { GetMenuWebResponse, GetPlaceDetailResponse } from '@/interfaces/response'
import { ChevronLeft } from 'react-bootstrap-icons'
import { numberFormatter } from '@/util/formatter'
import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import constant from '@/config/constant'

const { page } = constant

const Container = styled.div`
  width: 100%;
  padding: 0 50px;
  margin: 25px 0;
`

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

const PlaceDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>()
  const dispatch = useAppDispatch()

  const [placeDetail, setPlaceDetail] = useState<GetPlaceDetailResponse>()
  const [menus, setMenus] = useState<GetMenuWebResponse[]>([])

  const firstHalfMenus = (): GetMenuWebResponse[] => menus.slice(0, menus.length / 2 + 1)
  const secondHalfMenus = (): GetMenuWebResponse[] => menus.slice(menus.length / 2 + 1, menus.length)

  useEffect(() => {
    if (placeId === undefined) return

    const fetchPlaceDetail = async () => {
      const placeDetail = await dispatch(getPlaceDetail(placeId)).unwrap()
      setPlaceDetail(placeDetail.data)
    }

    const fetchMenus = async () => {
      const menus = await dispatch(getMenus(placeId)).unwrap()
      setMenus(menus.data)
    }
  
    fetchPlaceDetail()
    fetchMenus()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toMenuElement = (menu: GetMenuWebResponse) => (
    <div key={menu.id} css={`
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    `}>
      <div>
        {menu.name}
      </div>
      <div>
        {numberFormatter(menu.price, 'Rp.')}
      </div>
    </div>
  )

  return (
    <Container>
      <div css={`
        display: flex;
        align-items: center;
      `}>
        <Link to={page.place}>
          <ChevronLeft color="#00ADB5" size={20} css={`
            cursor: pointer;
            margin-right: 8px;
          `} />
        </Link>

        <Title>
          {placeDetail?.name}
        </Title>
      </div>

      <Line />

      <div css={`
        display: flex;
        justify-content: space-between;
      `}>
        <div css={`width: 45%;`}>
          {firstHalfMenus().map(toMenuElement)}
        </div>
        <div css={`width: 45%;`}>
          {secondHalfMenus().map(toMenuElement)}
        </div>
      </div>

      <div css={`margin-top: 12px;`}>
        Tax: {placeDetail?.percentage.tax}%
      </div>

      <div>
        Service: {placeDetail?.percentage.service}%
      </div>
    </Container>
  )
}

export default PlaceDetail
