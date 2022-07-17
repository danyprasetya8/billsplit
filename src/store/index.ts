import { configureStore } from '@reduxjs/toolkit'
import placeReducer from './slices/place'
import menuReducer from './slices/menu'

const store = configureStore({
  reducer: {
    place: placeReducer,
    menu: menuReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
