import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BaseResponse, GetPlacesResponse, GetPlaceDetailResponse } from '@/interfaces/response'
import axios from '@/axios'
import api from '@/config/api'

interface GetPlacesParams {
  page: number,
  keyword: string
}

export const getPlaces = createAsyncThunk(
  'places/getPlaces',
  async (params: GetPlacesParams) => {
    const response = await axios.get<BaseResponse<GetPlacesResponse[]>>(api.place, { params })
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

interface SavePlaceRequest {
  name: string,
  taxPercentage: number,
  servicePercentage: number,
  taxPriority: string
}

export const savePlace = createAsyncThunk(
  'places/savePlace',
  async (requestBody: SavePlaceRequest) => {
    const response = await axios.post<BaseResponse<boolean>>(api.place, requestBody)
    return response.data
  }
)

interface UpdatePlaceRquest extends SavePlaceRequest {
  placeId: string
}

export const updatePlace = createAsyncThunk(
  'places/updatePlace',
  async (requestBody: UpdatePlaceRquest) => {
    const response = await axios.put<BaseResponse<boolean>>(api.place, requestBody)
    return response.data
  }
)

export const placeSlice = createSlice({
  name: 'place',
  initialState: {},
  reducers: {}
})

export default placeSlice.reducer
