import { Db, ObjectId } from 'mongodb'
import { BaseResponse } from '../../interface/response'
import MenuRepository from '../../repository/MenuRepository'

interface RequestBody {
  menuId: string
}

const deleteMenu = async (db: Db, bodyString: string | null) => {
  const body: RequestBody = JSON.parse(bodyString || '')
  const menuId = new ObjectId(body.menuId)

  const menuRepository = new MenuRepository(db)
  const result = await menuRepository.delete(menuId)

  const response: BaseResponse<boolean> = {
    data: result.acknowledged
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export default deleteMenu
