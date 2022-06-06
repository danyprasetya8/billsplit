import { Db, ObjectId } from 'mongodb'
import { BaseResponse } from '../../interface/response'
import MenuRepository from '../../repository/MenuRepository'

interface GetMenuWebResponse {
  id: string,
  name: string,
  price: number
}

const getMenus = async (db: Db, queryStringParameters) => {
  const { placeId: placeIdString } = queryStringParameters
  const placeId = new ObjectId(placeIdString)

  const menuRepository = new MenuRepository(db)
  const menus = await menuRepository.findAll(placeId)

  const menuResponse: BaseResponse<GetMenuWebResponse[]> = {
    data: menus.map(menu => ({
      id: menu._id.toString(),
      name: menu.name,
      price: +menu.price
    }))
  }
  return {
    statusCode: 200,
    body: JSON.stringify(menuResponse)
  }
}

export default getMenus
