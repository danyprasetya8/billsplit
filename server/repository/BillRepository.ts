import { Collection, Db, Filter, ObjectId, UpdateResult } from 'mongodb'
import { ITEM_PER_PAGE } from '../constant'
import { BILLS } from '../constant/collection'
import { Bill } from '../interface/entity'

class BillRepository {

  private bills: Collection<Bill>

  constructor(db: Db) {
    this.bills = db.collection<Bill>(BILLS)
  }

  public async findById(billId: ObjectId): Promise<Bill | null> {
    const query: Filter<Bill> = { _id: billId }
    return await this.bills.findOne(query)
  }

  public async findPaginated(page: number): Promise<Bill[]> {
    return await this.bills.find()
      .sort({ date: -1 })
      .skip(page > 0 ? (( page - 1 ) * ITEM_PER_PAGE ) : 0)
      .limit(ITEM_PER_PAGE)
      .toArray()
  }

  public async getTotalPage(): Promise<number> {
    const total = await this.bills.countDocuments()
    return Math.ceil(total / ITEM_PER_PAGE)
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
