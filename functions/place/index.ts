import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'

const handler: Handler = async function() {
  const db = await connectToDatabase()
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: 'test'
    })
  }
}

export { handler }
