import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Heading, Row } from 'native-base'
import { TCommentsSectionProps } from './types'
import { useGetCommentsQuery } from '@app/store/api/comment'
import { useNavigation } from '@react-navigation/native'
import { EArticleStackScreens } from '@app/navigation/stacks'
import { CreateCommentModal } from '../CreateCommentModal'
import { CommentCard } from '@app/components/cards'

export const CommentsSection = ({ articleId }: TCommentsSectionProps) => {
  const { t } = useTranslation()
  const [openCreationModal, setOpenCreationModal] = useState(false)
  const navigation = useNavigation()
  const { data } = useGetCommentsQuery({ articleId, skip: 0, take: 5 })

  const onClose = () => {
    setOpenCreationModal(false)
  }

  const onOpen = () => {
    setOpenCreationModal(true)
  }

  const onPressShow = () => {
    navigation.navigate(EArticleStackScreens.Comments, {
      articleId,
    })
  }

  return (
    <>
      <Row alignItems="center" mb="10px" justifyContent="space-between">
        <Heading size="xs">
          {`${t('comments')} ${data?.totalCount ?? 0}`}
        </Heading>

        <Button variant="link" onPress={onPressShow}>
          {t('show_all')}
        </Button>
      </Row>

      {data?.models?.map((comment) => (
        <CommentCard key={comment.id} data={comment} />
      ))}

      <Button
        borderRadius={50}
        variant="outline"
        borderColor="primary.500"
        onPress={onOpen}
      >
        {t('write_comment')}
      </Button>

      <CreateCommentModal
        isOpen={openCreationModal}
        onClose={onClose}
        articleId={articleId}
      />
    </>
  )
}
