import React from 'react'
import { TArticleCardProps } from './types'
import { Avatar, Box, Heading, Text } from 'native-base'
import { format, parseISO } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

export const ArticleCard = ({ data, onPress }: TArticleCardProps) => {
  const { t } = useTranslation()

  const onPressCard = () => {
    onPress?.(data)
  }

  return (
    <Box
      backgroundColor="white"
      shadow="2"
      marginX="24px"
      marginY="6px"
      borderRadius="6px"
      overflow="hidden"
    >
      <TouchableNativeFeedback onPress={onPressCard}>
        <Box flex={1} padding="10px">
          <Box flexDirection="row" alignItems="center" mb="12px">
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

          <Heading size="xs">{data.title}</Heading>

          <Text color="muted.400" mt="12px">
            {`${t('published')}: ${format(
              parseISO(data.createdAt),
              'dd.MM.yyyy',
            )}`}
          </Text>
        </Box>
      </TouchableNativeFeedback>
    </Box>
  )
}
