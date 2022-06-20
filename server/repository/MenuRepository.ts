import { Collection, Db, DeleteResult, Filter, ObjectId, UpdateResult } from 'mongodb'
import { MENUS } from '../constant/collection'
import { Menu } from '../interface/entity'

class MenuRepository {

  private menus: Collection<Menu>

  constructor(db: Db) {
    this.menus = db.collection<Menu>(MENUS)
  }

  public async findById(menuId: ObjectId): Promise<Menu | null> {
    const query: Filter<Menu> = {
      _id: menuId
    }
    return await this.menus.findOne(query)
  }

  public async findAll(placeId: ObjectId): Promise<Menu[]> {
    const query: Filter<Menu> = {
      placeId
    }
    return await this.menus.find(query)
      .toArray()
  }

  public async save(menu: Menu): Promise<ObjectId | string> {
    const result = await this.menus.insertOne(menu)
    return result.insertedId
  }

  public async update(menuId: ObjectId, menu: Partial<Menu>): Promise<UpdateResult> {
    const query: Filter<Menu> = {
      _id: menuId
    }
    return await this.menus.updateOne(query, { $set: menu })
  }

  public async delete(menuId: ObjectId): Promise<DeleteResult> {
    const query: Filter<Menu> = {
      _id: menuId
    }
    return await this.menus.deleteOne(query)
  }
}

export default MenuRepository
