import { TaxPriority } from '@/enums'

export interface BaseResponse<T> {
  data: T,
  paging?: {
    page: number,
    itemPerPage: number,
    totalPage: number
  }
}

export interface GetPlacesResponse {
  id: string
  name: string
}

export interface GetPlaceDetailResponse {
  id: string,
  name: string,
  percentage: {
    tax: number,
    service: number
  },
  taxPriority: TaxPriority
}

export interface GetMenuWebResponse {
  id: string,
  name: string,
  price: number
}

export interface GetBillsResponse {
  id: string,
  placeName: string | null,
  date: number
}
