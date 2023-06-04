import { createApi } from '@reduxjs/toolkit/query/react'
import {
  TDeleteProfilePayload,
  TGetProfilePayload,
  TUpdateProfilePayload,
} from './types'
import { userActions } from '@app/store/slice'
import { axiosBaseQuery } from '@app/store/tools'
import { AuthService } from '@app/services/auth'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/user/' }),
  endpoints: (builder) => ({
    getProfile: builder.query<
      TGetProfilePayload['response'],
      TGetProfilePayload['request']
    >({
      query: () => {
        return {
          url: 'myProfile',
          method: 'GET',
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(userActions.setUserAction(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    updateProfile: builder.mutation<
      TUpdateProfilePayload['response'],
      TUpdateProfilePayload['request']
    >({
      query: (data) => {
        return {
          url: 'myProfile',
          method: 'PUT',
          data,
        }
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(userActions.setUserAction(data))
        } catch (error) {
          console.log(error)
        }
      },
    }),
    deleteProfile: builder.mutation<
      TDeleteProfilePayload['response'],
      TDeleteProfilePayload['request']
    >({
      query: () => {
        return {
          url: 'myProfile',
          method: 'DELETE',
        }
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          await queryFulfilled
          AuthService.logout()
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = userApi
