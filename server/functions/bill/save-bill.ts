import { Db, Long, ObjectId } from 'mongodb'
import { Bill, BillDetail } from '../../interface/entity'
import { BaseResponse } from '../../interface/response'
import { normalizeDate } from '../../helper/date'
import BillDetailRepository from '../../repository/BillDetailRepository'
import BillRepository from '../../repository/BillRepository'
import PlaceRepository from '../../repository/PlaceRepository'

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
  const body: RequestBody = JSON.parse(bodyString || '')

  const billRepository = new BillRepository(db)
  const billDetailRepository = new BillDetailRepository(db)
  const placeRepository = new PlaceRepository(db)

  const persons: PersonRequestBody[] = body.persons || []

  const place = await placeRepository.findById(new ObjectId(body.placeId))

  if (place == null) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Place not found' })
    }
  }

  const bill: Bill = {
    place: {
      name: place.name,
      percentage: place.percentage,
      taxPriority: place.taxPriority
    },
    date: Long.fromNumber(normalizeDate(body.date).getTime()),
    persons: persons.map(p => p.name)
  }
  const billId = await billRepository.save(bill)

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

export default saveBill
