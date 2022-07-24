import { Double, Long, ObjectId } from 'mongodb'

export enum TaxPriority {
  TAX = 'TAX',
  SERVICE = 'SERVICE'
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

export interface Bill {
  _id?: ObjectId | string,
  placeId: ObjectId | string,
  date: Long,
  persons: string[]
}

export interface BillDetail {
  _id?: ObjectId | string,
  billId: ObjectId | string,
  person: string,
  menu: Menu
}
