import { EArticleStackScreens, TArticleStack } from '@app/navigation/stacks'
import {
  useDeleteArticleMutation,
  useGetArticleByIdQuery,
} from '@app/store/api/article'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { parseISO, format } from 'date-fns'
import {
  Avatar,
  Heading,
  ScrollView,
  Box,
  Text,
  Row,
  IconButton,
  Icon,
  Divider,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RichEditor } from 'react-native-pell-rich-editor'
import { CommentsSection, LikeSection } from './components'
import { LoadingLayout } from '@app/components/layouts'
import { useTypedSelector } from '@app/store/store'
import { ActionModal } from '@app/components/modals'

export const ArticleScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [openDelationModal, setOpenDelationModal] = useState(false)

  const onOpen = () => {
    setOpenDelationModal(true)
  }

  const onClose = () => {
    setOpenDelationModal(false)
  }

  const { user } = useTypedSelector((store) => store.userState)

  const {
    params: { articleId },
  } = useRoute<RouteProp<TArticleStack, EArticleStackScreens.Article>>()

  const { data, isLoading, isFetching } = useGetArticleByIdQuery(
    { articleId },
    {
      refetchOnMountOrArgChange: true,
    },
  )

  const [deleteArticle, { isLoading: isDeleting, isSuccess }] =
    useDeleteArticleMutation()

  const onDeleteArticle = () => {
    if (data?.user?.id === user?.id && data?.id) {
      deleteArticle({ articleId: data.id })
    }
  }

  useEffect(() => {
    const isOwn = data?.user?.id === user?.id && data?.id

    navigation.setOptions({
      headerTitle: data?.title ?? '',
      headerRight: () =>
        isOwn ? (
          <IconButton
            disabled={isDeleting}
            onPress={onOpen}
            icon={
              <Icon
                as={<VectorIcon name={'delete'} />}
                size={5}
                mr="2"
                color="muted.400"
              />
            }
          />
        ) : (
          <></>
        ),
    })
  }, [navigation, data?.user?.id, isDeleting])

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack()
    }
  }, [isSuccess])

  if (isLoading || isFetching) {
    return <LoadingLayout />
  }

  return (
    <>
      <Box flex={1} backgroundColor="white">
        <ScrollView px="24px">
          <Box flexDirection="row" alignItems="center" flex={1} mt="24px">
            <Avatar
              bg="primary.200"
              source={
                data?.user?.avatar
                  ? {
                      uri: data.user.avatar,
                    }
                  : undefined
              }
            >
              {`${data?.user?.name?.[0]}${data?.user?.surname?.[0]}`}
            </Avatar>

            <Heading
              ml="12px"
              size="md"
            >{`${data?.user?.name} ${data?.user?.surname}`}</Heading>
          </Box>

          <Text color="muted.400" mt="12px">
            {`${t('published')}: ${
              data?.createdAt
                ? format(parseISO(data?.createdAt), 'dd.MM.yyyy')
                : ''
            }`}
          </Text>

          <Heading mt="24px" mb="24px">
            {data?.title}
          </Heading>

          <Box
            flex={1}
            borderColor="muted.300"
            borderBottomWidth={1}
            borderTopWidth={1}
            mb="24px"
          >
            <RichEditor
              androidLayerType="software"
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              initialContentHTML={data?.text || '<div></div>'}
              disabled={true}
            />
          </Box>

          {!!data?.id && (
            <LikeSection
              articleId={articleId}
              likes={data?.likesCount ?? 0}
              liked={!!data?.liked}
            />
          )}

          <Heading size="xs" mt="24px" mb="10px">
            {t('topics')}
          </Heading>

          <Row flexWrap="wrap" mb="16px">
            {data?.topics?.map((topic) => (
              <Box
                key={topic.id}
                padding="10px"
                borderColor="primary.500"
                borderWidth={1}
                borderRadius={50}
                margin="5px"
              >
                <Text fontWeight="500" color="primary.500">
                  {topic.title}
                </Text>
              </Box>
            ))}
          </Row>

          {!!data?.id && <CommentsSection articleId={data.id} />}

          <Divider backgroundColor="transparent" height="20px" />
        </ScrollView>
      </Box>

      <ActionModal
        isOpen={openDelationModal}
        onPressConfirm={onDeleteArticle}
        onClose={onClose}
        title={t('delete_article')}
        text={t('delete_article_confirmation')}
      />
    </>
  )
}
