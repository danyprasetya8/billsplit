import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { BaseResponse, GetMenuWebResponse } from '@/interfaces/response'
import { RootState } from '@/store'
import axios from '@/axios'
import api from '@/config/api'

export const getMenus = createAsyncThunk(
  'menus/getMenus',
  async (placeId: string, { dispatch }) => {
    const response = await axios.get<BaseResponse<GetMenuWebResponse[]>>(api.menu, {
      params: { placeId }
    })

    const { setMenus } = menuSlice.actions
    dispatch(setMenus(response.data.data))

    return response.data
  }
)

export const deleteMenu = createAsyncThunk(
  'menus/deleteMenu',
  async (menuId: string) => {
    const response = await axios.delete<BaseResponse<boolean>>(api.menu, {
      data: { menuId }
    })
    return response.data
  }
)

interface SaveMenuRequest {
  name: string,
  price: number,
  placeId: string
}

export const saveMenu = createAsyncThunk(
  'menus/saveMenu',
  async (requestBody: SaveMenuRequest) => {
    const response = await axios.post<BaseResponse<boolean>>(api.menu, requestBody)
    return response.data
  }
)

interface UpdateMenuRequest {
  name: string,
  price: number,
  menuId: string
}

export const updateMenu = createAsyncThunk(
  'menus/updateMenu',
  async (requestBody: UpdateMenuRequest) => {
    const response = await axios.put<BaseResponse<boolean>>(api.menu, requestBody)
    return response.data
  }
)

interface InitialState {
  menus: GetMenuWebResponse[]
}

const initialState: InitialState = {
  menus: []
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenus(state, actions: PayloadAction<GetMenuWebResponse[]>) {
      state.menus = actions.payload
    }
  }
})

export const menusSelector = (state: RootState) => state.menu.menus

export default menuSlice.reducer
