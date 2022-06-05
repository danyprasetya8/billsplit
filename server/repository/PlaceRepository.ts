import { Collection, Db } from 'mongodb'
import { ITEM_PER_PAGE } from '../constant'
import { PLACES } from '../constant/collection'
import { Place } from '../interface/entity'

class PlaceRepository {

  private collection: Collection<Place>

  constructor(db: Db) {
    this.collection = db.collection<Place>(PLACES)
  }

  public async findPaginated(page: number): Promise<Place[]> {
    return await this.collection.find()
      .skip(page > 0 ? (( page - 1 ) * ITEM_PER_PAGE ) : 0)
      .limit(ITEM_PER_PAGE)
      .toArray()
  }

  public async getTotalPage(): Promise<number> {
    const total = await this.collection.countDocuments()
    return Math.ceil(total / ITEM_PER_PAGE)
  }
}

export default PlaceRepository
