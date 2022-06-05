
export interface BaseResponse<T> {
  data: T,
  paging?: {
    page: number,
    itemPerPage: number,
    totalPage: number
  }
}
