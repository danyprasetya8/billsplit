import * as mongodb from 'mongodb'
import { Menu, TaxPriority } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import PlaceRepository from '../../repository/PlaceRepository'
import MenuRepository from '../../repository/MenuRepository'

interface GetMenuWebResponse {
  id: string,
  name: string,
  price: number
}

interface GetPlaceDetailResponse {
  name: string,
  percentage: {
    tax: number,
    service: number
  },
  taxPriority: TaxPriority,
  menus: GetMenuWebResponse[]
}

const getPlaceDetail = async (db: mongodb.Db, queryStringParameters) => { 
  const { placeId } = queryStringParameters

  const placeRepository = new PlaceRepository(db)
  const menuRepository = new MenuRepository(db)

  const placeIdObject = new mongodb.ObjectId(placeId)
  const { name, percentage, taxPriority } = await placeRepository.findById(placeIdObject)
  const menus = await menuRepository.findAll(placeIdObject)

  const placeResponse: BaseResponse<GetPlaceDetailResponse> = {
    data: {
      name,
      percentage: {
        tax: +percentage.tax,
        service: +percentage.service
      },
      taxPriority,
      menus: menus.map((menu: Menu) => ({
        id: menu._id.toString(),
        name: menu.name,
        price: +menu.price
      }))
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(placeResponse)
  }
}

export default getPlaceDetail
