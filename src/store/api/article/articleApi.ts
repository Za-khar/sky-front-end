import { createApi } from '@reduxjs/toolkit/query/react'
import { TCreateArticlePayload, TGetArticlesPayload } from './types'
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
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
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
    }),
  }),
})

export const { useGetArticlesQuery, useCreateArticleMutation } = articleApi
