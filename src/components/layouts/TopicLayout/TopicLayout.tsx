import React, { useState } from 'react'
import { TTopicLayoutProps } from './types'
import { useGetTopicsQuery } from '@app/store/api/topic'
import { Box, FlatList, Heading } from 'native-base'
import { SearchInput } from '@app/components/inputs'
import { TopicCard } from '@app/components/cards'
import { useTranslation } from 'react-i18next'
const TAKE = 10

export const TopicLayout = ({
  userId,
  renderButton,
  withSearch = false,
}: TTopicLayoutProps) => {
  const { t } = useTranslation()

  const [options, setOptions] = useState<{
    searchTerm?: string
    skip: number
  }>({
    skip: 0,
  })

  const { data, isLoading, isFetching } = useGetTopicsQuery(
    {
      userId,
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

  const onSearch = (value: string) => {
    setOptions(value ? { skip: 0, searchTerm: value } : { skip: 0 })
  }

  return (
    <>
      {withSearch && (
        <Box
          paddingX="24px"
          backgroundColor="white"
          paddingY="12px"
          borderBottomColor="primary.400"
          borderBottomWidth="1px"
        >
          <SearchInput value={options?.searchTerm ?? ''} onChange={onSearch} />

          <Heading mt="12px" size="xs">{`${t('total_count')} ${
            data?.totalCount ?? 0
          }`}</Heading>
        </Box>
      )}

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
