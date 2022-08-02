import { configureStore } from '@reduxjs/toolkit'
import placeReducer from './slices/place'
import menuReducer from './slices/menu'
import toastReducer from './slices/toast'

const store = configureStore({
  reducer: {
    place: placeReducer,
    menu: menuReducer,
    toast: toastReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
