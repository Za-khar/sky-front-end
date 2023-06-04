import { AuthService } from '@app/services/auth'
import React from 'react'
import { UserInfo } from './components/UserInfo/UserInfo'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { EProfileStackScreens } from '@app/navigation/stacks'
import { ProfileTabs } from './components'

export const ProfileMainScreen = () => {
  const navigation = useNavigation()

  const handleLogout = () => {
    AuthService.logout()
  }

  const handleEdit = () => {
    navigation.navigate(EProfileStackScreens.ProfileEdit)
  }

  return (
    <Box backgroundColor="white" flex={1}>
      <UserInfo onPressLogout={handleLogout} onPressEdit={handleEdit} />

      <ProfileTabs />
    </Box>
  )
}
