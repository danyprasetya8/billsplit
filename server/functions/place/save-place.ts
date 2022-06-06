import { Db } from 'mongodb'
import { Place } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'

const savePlace = async (db: Db, body) => {

  const placeRepository = new PlaceRepository(db)

  const newPlace: Place = {
    name: body.name,
    percentage: {
      tax: body.taxPercentage,
      service: body.servicePercentage
    },
    taxPriority: body.taxPriority,
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
