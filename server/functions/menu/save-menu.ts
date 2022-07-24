import { Db, Long, ObjectId } from 'mongodb'
import { Menu } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import MenuRepository from '../../repository/MenuRepository'

interface RequestBody {
  name: string,
  price: number,
  placeId: string
}

const saveMenu = async (db: Db, bodyString: string | null) => {
  const body: RequestBody = JSON.parse(bodyString || '')

  const placeId = new ObjectId(body.placeId)

  const menuRepository = new MenuRepository(db)

  const newMenu: Menu = {
    name: body.name,
    price: Long.fromNumber(body.price),
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
