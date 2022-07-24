import { useAppDispatch } from '@/hooks'
import { useParams } from 'react-router-dom'
import { getPlaceDetail } from '@/store/slices/place'
import { getMenus } from '@/store/slices/menu'
import { GetMenuWebResponse, GetPlaceDetailResponse } from '@/interfaces/response'
import { numberFormatter } from '@/util/formatter'
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import styled, { css } from 'styled-components'
import constant from '@/config/constant'

const { page } = constant

const Container = styled.div`
  width: 100%;
  padding: 0 50px;
  margin: 25px 0;
`

const menuElementStyle = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
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
    <div key={menu.id} css={menuElementStyle}>
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
      <Header
        title={placeDetail?.name}
        backUrl={page.place}
      />

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
