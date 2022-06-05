import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'
import getPlaces from './get-places'

const handler: Handler = async function({ httpMethod, queryStringParameters }) {
  const db = await connectToDatabase()
  if (httpMethod === 'GET') {
    return getPlaces(db, queryStringParameters)
  }
}

export { handler }
