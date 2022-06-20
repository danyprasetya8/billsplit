import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'
import getPlaceDetail from './get-place-detail'

const handler: Handler = async ({ queryStringParameters }) => {
  const db = await connectToDatabase()
  return getPlaceDetail(db, queryStringParameters)
}

export { handler }