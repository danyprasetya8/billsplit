import { Collection, Db, Filter, ObjectId, UpdateResult } from 'mongodb'
import { ITEM_PER_PAGE } from '../constant'
import { PLACES } from '../constant/collection'
import { Place } from '../interface/entity'

class PlaceRepository {

  private places: Collection<Place>

  constructor(db: Db) {
    this.places = db.collection<Place>(PLACES)
  }

  public async findById(id: ObjectId): Promise<Place | null> {
    const query: Filter<Place> = {
      _id: id
    }
    return await this.places.findOne(query)
  }

  public async findPaginated(page: number): Promise<Place[]> {
    return await this.places.find()
      .skip(page > 0 ? (( page - 1 ) * ITEM_PER_PAGE ) : 0)
      .limit(ITEM_PER_PAGE)
      .toArray()
  }

  public async getTotalPage(): Promise<number> {
    const total = await this.places.countDocuments()
    return Math.ceil(total / ITEM_PER_PAGE)
  }

  public async save(place: Place): Promise<string | ObjectId> {
    const result = await this.places.insertOne(place)
    return result.insertedId
  }

  public async update(placeId: ObjectId, place: Partial<Place>): Promise<UpdateResult> {
    const query: Filter<Place> = { _id: placeId }
    return await this.places.updateOne(query, { $set: place })
  }
}

export default PlaceRepository
