import { Collection, Db, DeleteResult, Filter, ObjectId } from 'mongodb'
import { BILL_DETAILS } from '../constant/collection'
import { BillDetail } from '../interface/entity'

class BillDetailRepository {

  private billDetails: Collection<BillDetail>

  constructor(db: Db) {
    this.billDetails = db.collection<BillDetail>(BILL_DETAILS)
  }

  public async deleteByBillId(billId: ObjectId): Promise<DeleteResult> {
    const query: Filter<BillDetail> = { billId }
    return await this.billDetails.deleteMany(query)
  }

  public async findAll(billId: ObjectId): Promise<BillDetail[]> {
    const query: Filter<BillDetail> = { billId }
    return await this.billDetails.find(query)
      .toArray()
  }

  public async save(billDetail: BillDetail): Promise<string | ObjectId> {
    const result = await this.billDetails.insertOne(billDetail)
    return result.insertedId
  }

  public async saveAll(billDetails: BillDetail[]): Promise<{ [key: number]: string | ObjectId }> {
    const result = await this.billDetails.insertMany(billDetails)
    return result.insertedIds
  }
}

export default BillDetailRepository
