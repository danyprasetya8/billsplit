import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'
import getBills from './get-bills'
import saveBill from './save-bill'
import updateBill from './update-bill'

const handler: Handler = async function({ httpMethod, queryStringParameters, body }) {
  const db = await connectToDatabase()
  if (httpMethod === 'GET') {
    return getBills(db, queryStringParameters)
  } else if (httpMethod === 'POST') {
    return saveBill(db, JSON.parse(body))
  } else if (httpMethod === 'PUT') {
    return updateBill(db, queryStringParameters, JSON.parse(body))
  }
}

export { handler }
