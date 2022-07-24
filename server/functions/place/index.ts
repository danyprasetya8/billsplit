import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'
import getPlaces from './get-places'
import savePlace from './save-place'
import updatePlace from './update-place'

const handler: Handler = async function({ httpMethod, queryStringParameters, body }) {
  const db = await connectToDatabase()
  if (httpMethod === 'GET') {
    return getPlaces(db, queryStringParameters)
  } else if (httpMethod === 'POST') {
    return savePlace(db, body)
  }
  return updatePlace(db, body)
}

export { handler }
