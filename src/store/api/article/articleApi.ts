import { createApi } from '@reduxjs/toolkit/query/react'
import {
  TCreateArticlePayload,
  TDeleteArticlePayload,
  TGetArticleByIdPayload,
  TGetArticlesPayload,
  TRateArticlePayload,
} from './types'
import { axiosBaseQuery } from '@app/store/tools'

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: axiosBaseQuery({ baseUrl: '/article/' }),
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getArticles: builder.query<
      TGetArticlesPayload['response'],
      TGetArticlesPayload['request']
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
        const topic = queryArgs?.topicId ? `/topicId=${queryArgs.topicId}` : ''

        return endpointName + user + topic
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
    createArticle: builder.mutation<
      TCreateArticlePayload['response'],
      TCreateArticlePayload['request']
    >({
      query: (data) => {
        return {
          url: 'create',
          method: 'POST',
          data,
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            articleApi.util.updateQueryData(
              'getArticles',
              { userId: data.user.id },
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

    deleteArticle: builder.mutation<
      TDeleteArticlePayload['response'],
      TDeleteArticlePayload['request']
    >({
      query: (data) => {
        return {
          url: data.articleId,
          method: 'DELETE',
          data,
        }
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(
            articleApi.util.updateQueryData(
              'getArticles',
              { userId: data.userId },
              (draft) => {
                draft.models = draft.models.filter((val) => val.id !== data.id)
                draft.totalCount -= 1
              },
            ),
          )
        } catch (err) {
          console.log(err)
        }
      },
    }),

    rateArticle: builder.mutation<
      TRateArticlePayload['response'],
      TRateArticlePayload['request']
    >({
      query: (data) => {
        return {
          url: 'rate',
          method: 'POST',
          data,
        }
      },
    }),

    getArticleById: builder.query<
      TGetArticleByIdPayload['response'],
      TGetArticleByIdPayload['request']
    >({
      query: (data) => {
        return {
          url: data.articleId,
          method: 'GET',
        }
      },
      providesTags: (result, error, arg) => [
        { type: 'Article', id: arg.articleId },
      ],
    }),
  }),
})

export const {
  useGetArticlesQuery,
  useCreateArticleMutation,
  useGetArticleByIdQuery,
  useRateArticleMutation,
  useDeleteArticleMutation,
} = articleApi
