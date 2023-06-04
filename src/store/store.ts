import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/auth'
import { userReduces } from './slice'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { userApi } from './api/user'
import { topicApi } from './api/topic'
import { articleApi } from './api/article'

export const store = configureStore({
  devTools: true,
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,

    userState: userReduces,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      topicApi.middleware,
      articleApi.middleware,
    ]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
