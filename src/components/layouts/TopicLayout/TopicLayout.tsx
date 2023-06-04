import React, { useState } from 'react'
import { TTopicLayoutProps } from './types'
import { useGetTopicsQuery } from '@app/store/api/topic'
import { FlatList, Text } from 'native-base'
import { SearchInput } from '@app/components/inputs'
import { TopicCard } from '@app/components/cards'
const TAKE = 10

export const TopicLayout = ({ userId, renderButton }: TTopicLayoutProps) => {
  const [options, setOptions] = useState<{
    searchTerm?: string
    skip: number
  }>({
    skip: 0,
  })

  const { data, isLoading, isFetching } = useGetTopicsQuery({
    userId,
    take: TAKE,
    ...options,
  })

  const loading = isLoading || isFetching

  const onRefresh = () => {
    setOptions((prev) => ({ ...prev, skip: 0 }))
  }

  const onLoadMore = () => {
    if (!loading && data && data.totalCount > data.models.length) {
      setOptions((prev) => ({ ...prev, skip: data.models.length }))
    }
  }

  const onSearch = (value: string) => {
    setOptions(value ? { skip: 0, searchTerm: value } : { skip: 0 })
  }

  return (
    <>
      <Text>{data?.totalCount}</Text>
      <SearchInput value={options?.searchTerm ?? ''} onChange={onSearch} />

      <FlatList
        data={data?.models ?? []}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        refreshing={isLoading}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <TopicCard data={item} renderButton={renderButton} />
        }}
      />
    </>
  )
}
