import * as mongodb from 'mongodb'
import { TaxPriority } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'

interface GetPlaceDetailResponse {
  name: string,
  percentage: {
    tax: number,
    service: number
  },
  taxPriority: TaxPriority
}

const getPlaceDetail = async (db: mongodb.Db, queryStringParameters) => { 
  const { placeId } = queryStringParameters

  const placeRepository = new PlaceRepository(db)

  const placeIdObject = new mongodb.ObjectId(placeId)
  const { name, percentage, taxPriority } = await placeRepository.findById(placeIdObject)

  const placeResponse: BaseResponse<GetPlaceDetailResponse> = {
    data: {
      name,
      percentage: {
        tax: +percentage.tax,
        service: +percentage.service
      },
      taxPriority
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(placeResponse)
  }
}

export default getPlaceDetail
