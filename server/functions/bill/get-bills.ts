import { Db, Long, ObjectId } from 'mongodb'
import { ITEM_PER_PAGE } from '../../constant'
import { Bill } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import BillRepository from '../../repository/BillRepository'
import PlaceRepository from '../../repository/PlaceRepository'

interface GetBillsResponse {
  placeName: string | null,
  date: Long
}

interface QueryParameters {
  page: number
}

const getBills = async (db: Db, queryStringParameters) => {
  const { page } = queryStringParameters as QueryParameters

  const billRepository = new BillRepository(db)
  const bills: Bill[] = await billRepository.findPaginated(page)
  const totalPage = await billRepository.getTotalPage()

  const placeRepository = new PlaceRepository(db)

  const data: GetBillsResponse[] = await Promise.all(bills.map(async bill => {
    const placeId = new ObjectId(bill.placeId)
    const place = await placeRepository.findById(placeId)

    return {
      placeName: place !== null ? place.name : null,
      date: bill.date
    }
  }))

  const billsResponse: BaseResponse<GetBillsResponse[]> = {
    data,
    paging: {
      page: +page,
      itemPerPage: ITEM_PER_PAGE,
      totalPage
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(billsResponse)
  }
}

export default getBills
