import React from 'react'
import { TCommentCardProps } from './types'
import { Avatar, Box, Heading, Row, Text } from 'native-base'
import { format, parseISO } from 'date-fns'

export const CommentCard = ({ data }: TCommentCardProps) => {
  return (
    <Box
      borderColor="muted.400"
      borderTopWidth={0.5}
      borderBottomWidth={0.5}
      py="12px"
      mb="12px"
    >
      <Row justifyContent="space-between" alignItems="center" mb="12px">
        <Row alignItems="center">
          <Avatar
            size="xs"
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
            size="xs"
          >{`${data?.user?.name} ${data?.user?.surname}`}</Heading>
        </Row>

        <Text color="muted.400">
          {format(parseISO(data.createdAt), 'dd.MM.yyyy')}
        </Text>
      </Row>

      <Text>{data?.content ?? ''}</Text>
    </Box>
  )
}
