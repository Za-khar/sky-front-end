import { createApi } from '@reduxjs/toolkit/query/react'
import { TGetTopicsPayload, TUpdateMyTopic } from './types'
import { axiosBaseQuery } from '@app/store/tools'
import _ from 'lodash'

export const topicApi = createApi({
  reducerPath: 'topicApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/topic/' }),
  tagTypes: ['Topic'],
  endpoints: (builder) => ({
    getTopics: builder.query<
      TGetTopicsPayload['response'],
      TGetTopicsPayload['request']
    >({
      query: (params) => {
        return {
          url: 'all',
          method: 'GET',
          params,
        }
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const user = queryArgs?.userId ? `/userId=${queryArgs.userId}` : ''

        return endpointName + user
      },
      merge: (currentCache, newItems, { arg }) => {
        if (currentCache && arg.skip !== 0) {
          currentCache.models.push(...newItems.models)
          currentCache.totalCount = newItems.totalCount
          return
        }

        currentCache.models = newItems.models
        currentCache.totalCount = newItems.totalCount
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),

    updateMyTopic: builder.mutation<
      TUpdateMyTopic['response'],
      TUpdateMyTopic['request']
    >({
      query: (data) => {
        return {
          url: 'update/my',
          method: 'POST',
          data: _.omit(data, 'userId'),
        }
      },
      async onQueryStarted({ userId, action }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            topicApi.util.updateQueryData('getTopics', { userId }, (draft) => {
              if (action === 'save') {
                draft.models.unshift(data)
                draft.totalCount += 1
              } else {
                draft.models = draft.models.filter(
                  (topic) => topic.id !== data.id,
                )
                draft.totalCount -= 1
              }
            }),
          )
          dispatch(
            topicApi.util.updateQueryData('getTopics', {}, (draft) => {
              draft.models = draft.models.map((val) =>
                val.id === data.id ? data : val,
              )
            }),
          )
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const { useGetTopicsQuery, useUpdateMyTopicMutation } = topicApi
