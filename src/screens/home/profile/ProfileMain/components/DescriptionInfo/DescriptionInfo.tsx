import { useTypedSelector } from '@app/store/store'
import { Box } from 'native-base'
import React from 'react'
import { Text } from 'react-native'

export const DescriptionInfo = () => {
  const { user } = useTypedSelector((store) => store.userState)
  return (
    <Box p={4}>
      <Text>{user?.description ?? ''}</Text>
    </Box>
  )
}
