import { Db, Long, ObjectId } from 'mongodb'
import { Menu } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import MenuRepository from '../../repository/MenuRepository'

interface RequestBody {
  name: string,
  price: number,
  menuId: string
}

const updateMenu = async (db: Db, queryStringParameters, bodyString: string | null) => {
  const body: RequestBody = JSON.parse(bodyString || '')

  const menuId = new ObjectId(body.menuId)

  const menuRepository = new MenuRepository(db)
  const menu: Partial<Menu> = {
    name: body.name,
    price: Long.fromNumber(body.price)
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
