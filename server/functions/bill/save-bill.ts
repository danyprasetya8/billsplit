import { Db, Long, ObjectId } from 'mongodb'
import { Bill, BillDetail } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import { normalizeDate } from '../../helper/date'
import BillDetailRepository from '../../repository/BillDetailRepository'
import BillRepository from '../../repository/BillRepository'

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

const saveBill = async (db: Db, bodyString: string | null) => {
  const body = JSON.parse(bodyString || '')

  const billRepository = new BillRepository(db)
  const billDetailRepository = new BillDetailRepository(db)

  const persons = body.persons || []

  const bill: Bill = {
    placeId: new ObjectId(body.placeId),
    date: Long.fromNumber(normalizeDate(body.date).getTime()),
    persons: persons.map(p => p.name)
  }
  const billId = await billRepository.save(bill)

  const billDetails: BillDetail[] = persons.flatMap(person => {
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

export default saveBill
