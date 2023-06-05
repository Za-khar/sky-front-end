import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './api/auth'
import { userReduces } from './slice'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { userApi } from './api/user'
import { topicApi } from './api/topic'
import { articleApi } from './api/article'
import { commentApi } from './api/comment'

export const store = configureStore({
  devTools: false,
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [topicApi.reducerPath]: topicApi.reducer,
    [articleApi.reducerPath]: articleApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,

    userState: userReduces,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      topicApi.middleware,
      articleApi.middleware,
      commentApi.middleware,
    ]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
