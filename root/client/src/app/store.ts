import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { userApi } from '../entities/UserCard'
import userSlice from '../entities/UserCard/model/userSlice'
import profileWidgetSlice from '../widgets/profileWidget/model/profileWidgetSlice'
import friendsWidgetSlice from '../widgets/friendsWidget/model/friendsWidgetSlice'

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  userSlice,
  profileWidgetSlice,
  friendsWidgetSlice
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store