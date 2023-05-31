import { t } from 'i18next'
import { Center, Icon, Heading } from 'native-base'
import React from 'react'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export const MainLogo = () => {
  return (
    <Center>
      <Icon as={<VectorIcon name="cloud" />} size="120px" color="primary.500" />
      <Heading color="primary.500" fontSize="24px" italic>
        {t('app_name')}
      </Heading>
    </Center>
  )
}
