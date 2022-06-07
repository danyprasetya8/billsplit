import { Collection, Db, Filter, ObjectId, UpdateResult } from 'mongodb'
import { BILLS } from '../constant/collection'
import { Bill } from '../interface/entity'

class BillRepository {

  private bills: Collection<Bill>

  constructor(db: Db) {
    this.bills = db.collection<Bill>(BILLS)
  }

  public async findById(billId: ObjectId): Promise<Bill> {
    const query: Filter<Bill> = { _id: billId }
    return await this.bills.findOne(query)
  }

  public async save(bill: Bill): Promise<string | ObjectId> {
    const result = await this.bills.insertOne(bill)
    return result.insertedId
  }

  public async update(billId: ObjectId, bill: Partial<Bill>): Promise<UpdateResult> {
    const query: Filter<Bill> = { _id: billId }
    return await this.bills.updateOne(query, { $set: bill })
  }
}

export default BillRepository