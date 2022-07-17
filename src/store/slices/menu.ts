import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BaseResponse, GetMenuWebResponse } from '@/interfaces/response'
import axios from '@/axios'
import api from '@/config/api'

export const getMenus = createAsyncThunk(
  'menus/getMenus',
  async (placeId: string) => {
    const response = await axios.get<BaseResponse<GetMenuWebResponse[]>>(api.menu, {
      params: { placeId }
    })
    return response.data
  }
)

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getMenus.fulfilled, (_, actions: PayloadAction<BaseResponse<GetMenuWebResponse[]>>) => {
      return actions.payload
    })
  }
})

export default menuSlice.reducer