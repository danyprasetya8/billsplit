import * as mongodb from 'mongodb'
import { TaxPriority } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'

interface GetPlaceDetailResponse {
  id: string,
  name: string,
  percentage: {
    tax: number,
    service: number
  },
  taxPriority: TaxPriority
}

interface QueryParameters {
  placeId: string
}

const getPlaceDetail = async (db: mongodb.Db, queryStringParameters) => { 
  const { placeId } = queryStringParameters as QueryParameters

  const placeRepository = new PlaceRepository(db)

  const placeIdObject = new mongodb.ObjectId(placeId)
  const place = await placeRepository.findById(placeIdObject)

  if (place === null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: 'Place not found' })
    }
  }

  const placeResponse: BaseResponse<GetPlaceDetailResponse> = {
    data: {
      id: place._id?.toString() || '',
      name: place.name,
      percentage: {
        tax: +place.percentage.tax,
        service: +place.percentage.service
      },
      taxPriority: place.taxPriority
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(placeResponse)
  }
}

export default getPlaceDetail
