import * as mongodb from 'mongodb'
import { ITEM_PER_PAGE } from '../../constant'
import { Place } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'

interface GetPlacesResponse {
  id: string
  name: string
}

interface QueryParameters {
  page: number
}

const getPlaces = async (db: mongodb.Db, queryStringParameters) => {
  const { page = 1 } = queryStringParameters as QueryParameters

  const placeRepository = new PlaceRepository(db)
  const places: Place[] = await placeRepository.findPaginated(page)
  const totalPage = await placeRepository.getTotalPage()

  const placesResponse: BaseResponse<GetPlacesResponse[]> = {
    data: places.map(place => {
      const id = place._id || ''
      return {
        id: id.toString(),
        name: place.name
      }
    }),
    paging: {
      page: +page,
      itemPerPage: ITEM_PER_PAGE,
      totalPage
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(placesResponse)
  }
}

export default getPlaces
