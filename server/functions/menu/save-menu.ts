import { Db, ObjectId } from 'mongodb'
import { Menu } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import MenuRepository from '../../repository/MenuRepository'

const saveMenu = async (db: Db, queryStringParameters, body) => {

  const { placeId: placeIdString } = queryStringParameters
  const placeId = new ObjectId(placeIdString)

  const menuRepository = new MenuRepository(db)

  const newMenu: Menu = {
    name: body.name,
    price: body.price,
    placeId
  }
  await menuRepository.save(newMenu)

  const response: BaseResponse<boolean> = {
    data: true
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export default saveMenu
