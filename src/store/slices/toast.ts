import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

interface Toast {
  visible: boolean,
  message: string,
  type: 'ERROR' | 'SUCCESS' | ''
}

interface InitialState {
  toast: Toast
}

const initialState: InitialState = {
  toast: {
    visible: false,
    message: '',
    type: ''
  }
}

export const toastSuccess = (message: string) => () => {
  const { showToast } = toastSlice.actions
  showToast({
    message,
    type: 'SUCCESS',
    visible: true
  })
  console.log(message, showToast)
}

export const toastGeneralFail = () => () => {
  const { showToast } = toastSlice.actions
  showToast({
    message: 'Something went wrong, please try again',
    type: 'ERROR',
    visible: true
  })
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast(state, actions: PayloadAction<Toast>) {
      state.toast = actions.payload
    },
    hideToast(state) {
      state.toast.visible = false
    }
  }
})

export const toastSelector = (state: RootState) => state.toast

export const { hideToast } = toastSlice.actions

export default toastSlice.reducer
