import { Double, Long, ObjectId } from 'mongodb'

export enum TaxPriority {
  TAX,
  SERVICE
}

export interface Place {
  _id?: ObjectId | string
  name: string,
  percentage: {
    tax: Double,
    service: Double
  },
  taxPriority: TaxPriority
}

export interface Menu {
  _id?: ObjectId | string,
  name: string,
  price: Long,
  placeId: ObjectId | string
}