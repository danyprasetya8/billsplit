import { Handler } from '@netlify/functions'
import { connectToDatabase } from '../../database/mongo'
import deleteMenu from './delete-menu'
import getMenus from './get-menus'
import saveMenu from './save-menu'
import updateMenu from './update-menu'

const handler: Handler = async function({ httpMethod, queryStringParameters, body }) {
  const db = await connectToDatabase()
  if (httpMethod === 'GET') {
    return getMenus(db, queryStringParameters)
  } else if (httpMethod === 'POST') {
    return saveMenu(db, queryStringParameters, JSON.parse(body))
  } else if (httpMethod === 'PUT') {
    return updateMenu(db, queryStringParameters, JSON.parse(body))
  } else if (httpMethod === 'DELETE') {
    return deleteMenu(db, queryStringParameters)
  }
}

export { handler }