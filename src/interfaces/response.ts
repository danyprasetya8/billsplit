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

enum TaxPriority {
  TAX,
  SERVICE
}

export interface GetPlaceDetailResponse {
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
