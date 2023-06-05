import React, { useEffect, useState } from 'react'
import { EditForm } from './EditForm'
import { ScrollView, Center, Stack, Button } from 'native-base'
import { TEditForm } from './EditForm/types'
import {
  useDeleteProfileMutation,
  useUpdateProfileMutation,
} from '@app/store/api/user'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { EProfileStackScreens } from '@app/navigation/stacks'
import { useTranslation } from 'react-i18next'
import { ActionModal } from '@app/components/modals'

export const ProfileEditScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const onOpen = () => {
    setOpenConfirmModal(true)
  }

  const onClose = () => {
    setOpenConfirmModal(false)
  }

  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation()
  const [deleteProfile] = useDeleteProfileMutation()

  const onSubmit = (data: TEditForm) => {
    updateProfile(_.omitBy(data, _.isEmpty))
  }

  const pressChangePassword = () => {
    navigation.navigate(EProfileStackScreens.ChangePassword)
  }

  const pressDeleteAccount = () => {
    deleteProfile()
  }

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack()
    }
  }, [isSuccess])

  return (
    <>
      <ScrollView backgroundColor="white">
        <Stack space={10} paddingTop="10%">
          <Center w="90%" alignSelf="center">
            <EditForm onSubmit={onSubmit} loading={isLoading} />
          </Center>

          <Button
            onPress={pressChangePassword}
            alignSelf="center"
            variant="link"
          >
            {t('change_password')}
          </Button>

          <Button
            onPress={onOpen}
            alignSelf="center"
            variant="link"
            colorScheme="secondary"
          >
            {t('delete_account')}
          </Button>
        </Stack>
      </ScrollView>

      <ActionModal
        isOpen={openConfirmModal}
        onPressConfirm={pressDeleteAccount}
        onClose={onClose}
        title={t('delete_account')}
        text={t('delete_account_confirmation')}
      />
    </>
  )
}
