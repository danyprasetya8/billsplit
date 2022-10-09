import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { BaseResponse, GetBillsResponse, GetPersonResponse } from '@/interfaces/response'
import { RootState } from '@/store'
import axios from '@/axios'
import api from '@/config/api'

export const getBills = createAsyncThunk(
  'bills/getBills',
  async ({ page, keyword }: { page: number, keyword: string }) => {
    const response = await axios.get<BaseResponse<GetBillsResponse[]>>(api.bill, { params: { page, keyword } })
    return response.data
  }
)

interface BillDraft {
  placeId: string,
  persons: GetPersonResponse[]
}

interface InitialState {
  billDraft: Partial<BillDraft>
}

const initialState: InitialState = {
  billDraft: {}
}

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setBillDraftPlace(state, actions: PayloadAction<string>) {
      state.billDraft.placeId = actions.payload
    }
  }
})

export const billDraftSelector = (state: RootState) => state.bill.billDraft

export default billSlice.reducer