import { Box, Heading, Button } from 'native-base'
import React from 'react'
import { TTopicCard } from './types'
import { useTranslation } from 'react-i18next'
import { useUpdateMyTopicMutation } from '@app/store/api/topic'
import { useTypedSelector } from '@app/store/store'

export const TopicCard = ({ data, renderButton }: TTopicCard) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector((store) => store.userState)
  const [updateSelectedTopic, { isLoading }] = useUpdateMyTopicMutation()

  const onPressUpdate = () => {
    if (data.selected) {
      updateSelectedTopic({
        userId: user?.id ?? '',
        topic: data.id,
        action: 'unsave',
      })
      return
    }

    updateSelectedTopic({
      userId: user?.id ?? '',
      topic: data.id,
      action: 'save',
    })
    return
  }

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
      <Heading>{data?.title}</Heading>
      {renderButton ? (
        renderButton(data)
      ) : (
        <Button onPress={onPressUpdate} isLoading={isLoading}>
          {t(data.selected ? 'btn_remove' : 'btn_add')}
        </Button>
      )}
    </Box>
  )
}
