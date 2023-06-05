import React, { useEffect, useRef, useState } from 'react'
import { TLikeSectionProps } from './types'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton, Row, Icon, Text } from 'native-base'
import { useRateArticleMutation } from '@app/store/api/article'
import { useDebounce } from '@app/hooks'

export const LikeSection = ({ likes, articleId, liked }: TLikeSectionProps) => {
  const [likeMyMe, setLikeByMe] = useState(liked)
  const [likesCount, setLikesCount] = useState(likes)
  const debauncedValue = useDebounce<boolean>(likeMyMe, 500)
  const initialRef = useRef<boolean>(false)
  const [rateArticle] = useRateArticleMutation()

  const onPress = () => {
    const currentAction = !likeMyMe
    setLikeByMe(currentAction)
    setLikesCount(currentAction ? likesCount + 1 : likesCount - 1)
  }

  useEffect(() => {
    if (!initialRef.current) {
      initialRef.current = true
      return
    }
    rateArticle({ articleId, isLiked: debauncedValue })
  }, [debauncedValue])

  return (
    <Row alignItems="center">
      <IconButton
        onPress={onPress}
        icon={
          <Icon
            as={<VectorIcon name={'hand-clap'} />}
            size={5}
            mr="2"
            color={likeMyMe ? 'primary.500' : 'muted.400'}
          />
        }
      />

      <Text>{likesCount}</Text>
    </Row>
  )
}
