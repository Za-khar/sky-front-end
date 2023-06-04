import { useTypedSelector } from '@app/store/store'
import { Avatar, Flex, Row, Heading, Button } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TUserInfoProps } from './types'

export const UserInfo = ({ onPressEdit, onPressLogout }: TUserInfoProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector((store) => store.userState)

  return (
    <Flex paddingX="24px" paddingY="12px">
      <Row alignItems="center">
        <Avatar
          bg="primary.200"
          source={{
            uri: 'https://bit.ly/broken-link',
          }}
        >
          {`${user?.name?.[0]}${user?.surname?.[0]}`}
        </Avatar>
        <Heading ml="12px" size="md">
          {`${user?.name} ${user?.surname}`}
        </Heading>
      </Row>

      <Row alignItems="center" justifyContent="space-between" mt="16px">
        <Button
          width="48%"
          onPress={onPressEdit}
          variant="outline"
          borderColor="primary.500"
          borderRadius={50}
        >
          {t('edit')}
        </Button>
        <Button
          width="48%"
          onPress={onPressLogout}
          backgroundColor="red.400"
          borderRadius={50}
        >
          {t('logout')}
        </Button>
      </Row>
    </Flex>
  )
}
