import { createApi } from '@reduxjs/toolkit/query/react'
import { TLoginPayload, TRegistrationPayload } from './types'
import { userActions } from '@app/store/slice'
import { AuthService } from '@app/services/auth'
import { axiosBaseQuery } from '@app/store/tools'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/auth/' }),
  endpoints: (builder) => ({
    login: builder.mutation<
      TLoginPayload['response'],
      TLoginPayload['request']
    >({
      query: (data) => {
        return {
          url: 'login',
          method: 'POST',
          data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { refreshToken, accessToken, ...userData } = data

          await AuthService.setTokens({ refreshToken, accessToken })
          dispatch(userActions.setUserAction(userData))
        } catch (error) {
          console.log(error)
        }
      },
    }),

    registration: builder.mutation<
      TRegistrationPayload['response'],
      TRegistrationPayload['request']
    >({
      query: (data) => {
        return {
          url: 'register',
          method: 'POST',
          data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          const { refreshToken, accessToken, ...userData } = data

          await AuthService.setTokens({ refreshToken, accessToken })
          dispatch(userActions.setUserAction(userData))
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRegistrationMutation } = authApi
