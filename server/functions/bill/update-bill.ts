import { Db, Long, ObjectId } from 'mongodb'
import { BaseResponse } from '../../interface/response'
import { normalizeDate } from '../../helper/date'
import BillDetailRepository from '../../repository/BillDetailRepository'
import BillRepository from '../../repository/BillRepository'
import { BillDetail } from '../../interface/entity'

interface MenuRequestBody {
  id: string,
  name: string,
  price: number
}

interface PersonRequestBody {
  name: string,
  menus: MenuRequestBody[]
}

interface RequestBody {
  placeId: string,
  date: number,
  persons: PersonRequestBody[]
}

interface QueryParameters {
  billId: string
}

const updateBill = async (db: Db, queryStringParameters, bodyString: string | null) => {
  const body = JSON.parse(bodyString || '') as RequestBody

  const { billId: billIdString } = queryStringParameters as QueryParameters
  const billId = new ObjectId(billIdString)

  const billRepository = new BillRepository(db)
  const billDetailRepository = new BillDetailRepository(db)

  const persons = body.persons || []

  let bill = await billRepository.findById(billId)
  bill = {
    placeId: new ObjectId(body.placeId),
    date: Long.fromNumber(normalizeDate(body.date).getTime()),
    persons: persons.map(p => p.name)
  }
  await billRepository.update(billId, bill)


  await billDetailRepository.deleteByBillId(billId)
  const billDetails: BillDetail[] = persons.flatMap(person => {
    return person.menus.map(({ id, name, price }) => ({
      billId,
      person: person.name,
      menu: {
        _id: id,
        name,
        price: Long.fromNumber(price),
        placeId: body.placeId
      }
    }))
  })
  await billDetailRepository.saveAll(billDetails)

  const response: BaseResponse<boolean> = {
    data: true
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}

export default updateBill
