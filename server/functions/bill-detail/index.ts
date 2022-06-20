import { Handler } from '@netlify/functions'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '../../database/mongo'
import { BaseResponse } from '../../interface/response'
import BillDetailRepository from '../../repository/BillDetailRepository'
import BillRepository from '../../repository/BillRepository'

interface GetMenuResponse {
  id: string,
  name: string,
  price: number
}

interface GetPersonResponse {
  name: string,
  menus: GetMenuResponse[]
}

interface GetBillDetailResponse {
  placeId: string,
  persons: GetPersonResponse[]
}

type QueryParameters = {
  billId: string
}

const handler: Handler = async function({ queryStringParameters }) {
  const db = await connectToDatabase()

  const { billId: billIdString } = queryStringParameters as QueryParameters

  const billRepository = new BillRepository(db)
  const billDetailRepository = new BillDetailRepository(db)

  const billId = new ObjectId(billIdString)
  const bill = await billRepository.findById(billId)
  const persons = await billDetailRepository.groupByPerson(billId)

  if (bill === null || !persons.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errors: 'Bill not found' })
    }
  }

  const response: BaseResponse<GetBillDetailResponse> = {
    data: {
      placeId: bill.placeId.toString(),
      persons: persons.map(person => ({
        name: person._id,
        menus: person.menus
      }))
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export { handler }
