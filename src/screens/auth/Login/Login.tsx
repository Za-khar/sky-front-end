import React from 'react'
import { ScrollView, Center, Button, Stack } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { EAuthStackScreens } from '@app/navigation/stacks'
import { LoginForm } from './components'
import { TLoginForm } from './components/LoginForm/types'
import { MainLogo } from '@app/components/logos'

export const LoginScreen = () => {
  const { navigate } = useNavigation()
  const { t } = useTranslation()

  const onPressRegistration = () => {
    navigate(EAuthStackScreens.Registration)
  }

  const onSubmit = (data: TLoginForm) => {
    console.log(data)
  }

  return (
    <ScrollView backgroundColor="white">
      <Stack space={5} paddingTop="25%">
        <MainLogo />

        <Center w="80%" alignSelf="center">
          <LoginForm onSubmit={onSubmit} />
        </Center>

        <Button
          variant="link"
          color="primary.500"
          onPress={onPressRegistration}
        >
          {t('to_registration')}
        </Button>
      </Stack>
    </ScrollView>
  )
}
