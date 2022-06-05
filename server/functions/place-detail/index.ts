import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'
import getPlaceDetail from './get-place-detail'

const handler: Handler = async ({ httpMethod, queryStringParameters }) => {
  const db = await connectToDatabase()
  if (httpMethod === 'GET') {
    return getPlaceDetail(db, queryStringParameters)
  }
}

export { handler }