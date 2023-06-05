import { AuthService } from '@app/services/auth'
import React, { useState } from 'react'
import { Box } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { EProfileStackScreens } from '@app/navigation/stacks'
import { ProfileTabs, UserInfo } from './components'
import { ActionModal } from '@app/components/modals'
import { useTranslation } from 'react-i18next'

export const ProfileMainScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const [openLogoutModal, setOpenLogoutModal] = useState(false)

  const onOpen = () => {
    setOpenLogoutModal(true)
  }

  const onClose = () => {
    setOpenLogoutModal(false)
  }

  const handleLogout = () => {
    AuthService.logout()
  }

  const handleEdit = () => {
    navigation.navigate(EProfileStackScreens.ProfileEdit)
  }

  return (
    <>
      <Box backgroundColor="white" flex={1}>
        <UserInfo onPressLogout={onOpen} onPressEdit={handleEdit} />

        <ProfileTabs />
      </Box>
      <ActionModal
        isOpen={openLogoutModal}
        onPressConfirm={handleLogout}
        onClose={onClose}
        title={t('logout')}
        text={t('logout_confirmation')}
      />
    </>
  )
}
