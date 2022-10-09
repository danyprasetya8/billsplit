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

export interface GetBillDetailResponse {
  place: {
    name: string,
    percentage: {
      tax: number,
      service: number
    },
    taxPriority: TaxPriority
  },
  persons: GetPersonResponse[]
}

export interface GetPersonResponse {
  name: string,
  menus: GetMenuWebResponse[]
}

export interface GetPlaceAutoSuggestResponse {
  name: string,
  id: string
}

