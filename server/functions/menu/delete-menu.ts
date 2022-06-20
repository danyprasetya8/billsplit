import { Db, ObjectId } from 'mongodb'
import { BaseResponse } from '../../interface/response'
import MenuRepository from '../../repository/MenuRepository'

interface QueryParameters {
  menuId: string
}

const deleteMenu = async (db: Db, queryStringParameters) => {
  const { menuId: menuIdString } = queryStringParameters as QueryParameters
  const menuId = new ObjectId(menuIdString)

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
