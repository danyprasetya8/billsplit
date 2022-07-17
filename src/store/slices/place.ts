import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BaseResponse, GetPlacesResponse, GetPlaceDetailResponse } from '@/interfaces/response'
import axios from '@/axios'
import api from '@/config/api'

export const getPlaces = createAsyncThunk(
  'places/getPlaces',
  async (page: number) => {
    const response = await axios.get<BaseResponse<GetPlacesResponse[]>>(api.place, {
      params: { page }
    })
    return response.data
  }
)

export const getPlaceDetail = createAsyncThunk(
  'places/getPlaceDetail',
  async (placeId: string) => {
    const response = await axios.get<BaseResponse<GetPlaceDetailResponse>>(api.placeDetail, {
      params: { placeId }
    })
    return response.data
  }
)

export const placeSlice = createSlice({
  name: 'place',
  initialState: {},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPlaces.fulfilled, (_, actions: PayloadAction<BaseResponse<GetPlacesResponse[]>>) => {
      return actions.payload
    })
    builder.addCase(getPlaceDetail.fulfilled, (_, actions: PayloadAction<BaseResponse<GetPlaceDetailResponse>>) => {
      return actions.payload
    })
  }
})

export default placeSlice.reducer
