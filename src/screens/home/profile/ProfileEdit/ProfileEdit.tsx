import React from 'react'
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

export const ProfileEditScreen = () => {
  const navigation = useNavigation()
  const { t } = useTranslation()

  const [updateProfile] = useUpdateProfileMutation()
  const [deleteProfile] = useDeleteProfileMutation()

  const onSubmit = (data: TEditForm) => {
    console.log(data)
    updateProfile(_.omitBy(data, _.isEmpty))
  }

  const pressChangePassword = () => {
    navigation.navigate(EProfileStackScreens.ChangePassword)
  }

  const pressDeleteAccount = () => {
    deleteProfile()
  }

  return (
    <ScrollView backgroundColor="white">
      <Stack space={10} paddingTop="10%">
        <Center w="90%" alignSelf="center">
          <EditForm onSubmit={onSubmit} />
        </Center>

        <Button onPress={pressChangePassword} alignSelf="center" variant="link">
          {t('change_password')}
        </Button>

        <Button
          onPress={pressDeleteAccount}
          alignSelf="center"
          variant="link"
          colorScheme="secondary"
        >
          {t('delete_account')}
        </Button>
      </Stack>
    </ScrollView>
  )
}
