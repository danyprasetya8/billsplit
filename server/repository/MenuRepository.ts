import { Collection, Db, Filter, ObjectId } from 'mongodb'
import { MENUS } from '../constant/collection'
import { Menu } from '../interface/entity'

class MenuRepository {

  private menus: Collection<Menu>

  constructor(db: Db) {
    this.menus = db.collection<Menu>(MENUS)
  }

  public async findAll(placeId: ObjectId): Promise<Menu[]> {
    const query: Filter<Menu> = {
      placeId
    }
    return await this.menus.find(query)
      .toArray()
  }
}

export default MenuRepository
