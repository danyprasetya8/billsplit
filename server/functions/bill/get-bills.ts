import { Db, Long } from 'mongodb'
import { ITEM_PER_PAGE } from '../../constant'
import { Bill } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import BillRepository from '../../repository/BillRepository'

interface GetBillsResponse {
  id: string,
  placeName: string | null,
  date: Long
}

interface QueryParameters {
  page: number,
  keyword: string
}

const getBills = async (db: Db, queryStringParameters) => {
  const { page = 1, keyword } = queryStringParameters as QueryParameters

  const billRepository = new BillRepository(db)
  const bills: Bill[] = await billRepository.findPaginatedWithKeyword(page, keyword)
  const totalPage = await billRepository.getTotalPage()

  const data: GetBillsResponse[] = await Promise.all(bills.map(async bill => {
    return {
      id: bill._id?.toString() || '',
      placeName: bill.place.name,
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
