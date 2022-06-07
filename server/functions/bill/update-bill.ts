import { Db, Long, ObjectId } from 'mongodb'
import { BaseResponse } from '../../interface/response'
import { normalizeDate } from '../../helper/date'
import BillDetailRepository from '../../repository/BillDetailRepository'
import BillRepository from '../../repository/BillRepository'

const updateBill = async (db: Db, queryStringParameters, body) => {

  const { billId: billIdString } = queryStringParameters
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
  const billDetails = persons.flatMap(person => {
    return person.menus.map(({ id, name, price }) => ({
      billId,
      person: person.name,
      menu: { id, name, price }
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
