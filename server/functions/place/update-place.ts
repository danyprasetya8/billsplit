import { Db, ObjectId } from 'mongodb'
import { Place } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'

const updatePlace = async (db: Db, queryStringParameters, body) => {

  const { placeId: placeIdString }: { placeId: string } = queryStringParameters
  const placeId: ObjectId = new ObjectId(placeIdString)

  const placeRepository = new PlaceRepository(db)

  const place: Partial<Place> = {
    name: body.name,
    percentage: {
      tax: body.taxPercentage,
      service: body.servicePercentage
    },
    taxPriority: body.taxPriority
  }
  await placeRepository.update(placeId, place)

  const response: BaseResponse<boolean> = {
    data: true
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export default updatePlace
