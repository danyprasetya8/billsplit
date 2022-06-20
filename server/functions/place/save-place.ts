import { Db, Double } from 'mongodb'
import { Place } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'
import { TaxPriority } from '../../interface/entity'

interface RequestBody {
  name: string,
  taxPercentage: number,
  servicePercentage: number,
  taxPriority: string
}

const savePlace = async (db: Db, bodyString: string | null) => {
  const body: RequestBody = JSON.parse(bodyString || '')

  const placeRepository = new PlaceRepository(db)

  const newPlace: Place = {
    name: body.name,
    percentage: {
      tax: new Double(body.taxPercentage),
      service: new Double(body.servicePercentage)
    },
    taxPriority: TaxPriority[body.taxPriority],
  }
  await placeRepository.save(newPlace)

  const response: BaseResponse<boolean> = {
    data: true
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export default savePlace
