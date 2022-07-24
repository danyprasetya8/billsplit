import { Db, Double, ObjectId } from 'mongodb'
import { Place, TaxPriority } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'

interface RequestBody {
  placeId: string,
  name: string,
  taxPercentage: number,
  servicePercentage: number,
  taxPriority: string
}

const updatePlace = async (db: Db, bodyString: string | null) => {
  const body = JSON.parse(bodyString || '') as RequestBody

  const placeId: ObjectId = new ObjectId(body.placeId)

  const placeRepository = new PlaceRepository(db)

  const place: Partial<Place> = {
    name: body.name,
    percentage: {
      tax: new Double(body.taxPercentage),
      service: new Double(body.servicePercentage)
    },
    taxPriority: TaxPriority[body.taxPriority],
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
