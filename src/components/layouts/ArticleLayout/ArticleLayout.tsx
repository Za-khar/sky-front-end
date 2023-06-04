import React, { useState } from 'react'
import { TArticleLayoutProps } from './types'
import { Box, FlatList, Heading, Text } from 'native-base'
import { SearchInput } from '@app/components/inputs'
import { useGetArticlesQuery } from '@app/store/api/article'
const TAKE = 10

export const ArticleLayout = ({ userId, topicId }: TArticleLayoutProps) => {
  const [options, setOptions] = useState<{
    searchTerm?: string
    skip: number
  }>({
    skip: 0,
  })

  const { data, isLoading, isFetching } = useGetArticlesQuery({
    topicId,
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
          return (
            <Box
              w="100%"
              backgroundColor="white"
              borderColor="primary.200"
              borderTopWidth="0.5px"
              borderBottomWidth="0.5px"
              paddingX={10}
              paddingY={5}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading>{item?.title}</Heading>
            </Box>
          )
        }}
      />
    </>
  )
}
