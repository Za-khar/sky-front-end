import { createApi } from '@reduxjs/toolkit/query/react'
import { TCreateCommentPayload, TGetCommentsPayload } from './types'
import { axiosBaseQuery } from '@app/store/tools'

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/comment/' }),
  endpoints: (builder) => ({
    getComments: builder.query<
      TGetCommentsPayload['response'],
      TGetCommentsPayload['request']
    >({
      query: (params) => {
        return {
          url: '',
          method: 'GET',
          params,
        }
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const article = queryArgs?.articleId
          ? `/articleId=${queryArgs.articleId}`
          : ''

        return endpointName + article
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
    }),
    createComment: builder.mutation<
      TCreateCommentPayload['response'],
      TCreateCommentPayload['request']
    >({
      query: (data) => {
        return {
          url: 'create',
          method: 'POST',
          data,
        }
      },
      async onQueryStarted({ articleId }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            commentApi.util.updateQueryData(
              'getComments',
              { articleId },
              (draft) => {
                draft.models.unshift(data)
                draft.totalCount += 1
              },
            ),
          )
        } catch (err) {
          console.log(err)
        }
      },
    }),
  }),
})

export const { useCreateCommentMutation, useGetCommentsQuery } = commentApi
