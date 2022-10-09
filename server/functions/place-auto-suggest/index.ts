import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'

interface GetPlaceAutoSuggestResponse {
  name: string,
  id: string
}

const handler: Handler = async function() {
  const db = await connectToDatabase()
  const placeRepository = new PlaceRepository(db)

  const places = await placeRepository.findAll()

  const data: GetPlaceAutoSuggestResponse[] = places.map(place => ({
    id: place._id?.toString() || '',
    name: place.name
  }))

  const responses: BaseResponse<GetPlaceAutoSuggestResponse[]> = { data }

  return {
    statusCode: 200,
    body: JSON.stringify(responses)
  }
}

export { handler }
