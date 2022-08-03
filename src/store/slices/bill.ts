import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BaseResponse, GetBillsResponse } from '@/interfaces/response'
import axios from '@/axios'
import api from '@/config/api'

export const getBills = createAsyncThunk(
  'bills/getBills',
  async ({ page, keyword }: { page: number, keyword: string }) => {
    const response = await axios.get<BaseResponse<GetBillsResponse[]>>(api.bill, { params: { page, keyword } })
    return response.data
  }
)

export const billSlice = createSlice({
  name: 'bill',
  initialState: {},
  reducers: {}
})

export default billSlice.reducer