import { Db, ObjectId } from 'mongodb'
import { Menu } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import MenuRepository from '../../repository/MenuRepository'

const updateMenu = async (db: Db, queryStringParameters, body) => {

  const { menuId: menuIdString } = queryStringParameters
  const menuId = new ObjectId(menuIdString)

  const menuRepository = new MenuRepository(db)
  const menu: Partial<Menu> = {
    name: body.name,
    price: body.price
  }
  await menuRepository.update(menuId, menu)

  const response: BaseResponse<boolean> = {
    data: true
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export default updateMenu
