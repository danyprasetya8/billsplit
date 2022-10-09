import { useAppDispatch } from '@/hooks'
import { getPlaceDetail } from '@/store/slices/place'
import { GetPlaceDetailResponse } from '@/interfaces/response'
import { useNavigate, useParams } from 'react-router-dom'
import { Container } from '@/util/style'
import React, { useEffect, useState } from 'react'
import CreateMenu from '@/components/CreateMenu'
import Button from '@/components/Button'
import Header from '@/components/Header'
import MenuList from '@/components/MenuList'
import constant from '@/config/constant'

const { page } = constant

const PlaceDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [placeDetail, setPlaceDetail] = useState<GetPlaceDetailResponse>()

  useEffect(() => {
    if (placeId === undefined) return

    const fetchPlaceDetail = async (): Promise<void> => {
      const placeDetail = await dispatch(getPlaceDetail(placeId)).unwrap()
      setPlaceDetail(placeDetail.data)
    }

    fetchPlaceDetail()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const toEditPlacePage = () => {
    if (placeId === undefined) return
    navigate(page.updatePlace.replace(':placeId', placeId))
  }

  return (
    <Container>
      <Header
        title={placeDetail?.name}
        backUrl={page.place}
      />

      <Button
        className="w-25"
        onClick={toEditPlacePage}
      >
        Edit Place
      </Button>

      <div className="my-4">
        <CreateMenu placeId={placeId || ''} />
      </div>

      <MenuList placeId={placeId || ''} />

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
