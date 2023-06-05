import React, { useState } from 'react'
import { TArticleLayoutProps } from './types'
import { Box, Divider, FlatList, Heading } from 'native-base'
import { SearchInput } from '@app/components/inputs'
import { useGetArticlesQuery } from '@app/store/api/article'
import { useTranslation } from 'react-i18next'
import { ArticleCard } from '@app/components/cards'
import { TArticle } from '@app/types/article'
import { useNavigation } from '@react-navigation/native'
import {
  EArticleStackScreens,
  EProfileStackScreens,
} from '@app/navigation/stacks'
const TAKE = 10

export const ArticleLayout = ({
  userId,
  topicId,
  withSearch,
}: TArticleLayoutProps) => {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const [options, setOptions] = useState<{
    searchTerm?: string
    skip: number
  }>({
    skip: 0,
  })

  const { data, isLoading, isFetching } = useGetArticlesQuery(
    {
      topicId,
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

  const onPressCard = (data: TArticle) => {
    navigation.navigate(EProfileStackScreens.ProfileArticleStack, {
      screen: EArticleStackScreens.Article,
      params: {
        articleId: data.id,
      },
    })
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
          return <ArticleCard data={item} onPress={onPressCard} />
        }}
        ListHeaderComponent={() => (
          <Divider height="12px" backgroundColor="transparent" />
        )}
      />
    </>
  )
}
