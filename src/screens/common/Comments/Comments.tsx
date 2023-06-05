import React, { useState } from 'react'
import { Divider, FlatList } from 'native-base'
import { CommentCard } from '@app/components/cards'
import { EArticleStackScreens, TArticleStack } from '@app/navigation/stacks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useGetCommentsQuery } from '@app/store/api/comment'

const TAKE = 10

export const CommentsScreen = () => {
  const {
    params: { articleId },
  } = useRoute<RouteProp<TArticleStack, EArticleStackScreens.Comments>>()

  const [options, setOptions] = useState<{
    skip: number
  }>({
    skip: 0,
  })

  const { data, isLoading, isFetching } = useGetCommentsQuery(
    {
      articleId,
      take: TAKE,
      ...options,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  const loading = isLoading || isFetching

  const onRefresh = () => {
    setOptions((prev) => ({ ...prev, skip: 0 }))
  }

  const onLoadMore = () => {
    if (!loading && data && data.totalCount > data.models.length) {
      setOptions((prev) => ({ ...prev, skip: data.models.length }))
    }
  }

  return (
    <FlatList
      px="24px"
      data={data?.models ?? []}
      onRefresh={onRefresh}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      refreshing={isLoading}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return <CommentCard data={item} />
      }}
      ListHeaderComponent={() => (
        <Divider height="12px" backgroundColor="transparent" />
      )}
    />
  )
}
