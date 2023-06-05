import React from 'react'
import { RegistrationForm } from './components'
import { TRegistrationForm } from './components/RegistrationForm/types'
import { ScrollView, Center, Stack } from 'native-base'
import { MainLogo } from '@app/components/logos'
import { useRegistrationMutation } from '@app/store/api'
import _ from 'lodash'

export const RegistrationScreen = () => {
  const [register, { isLoading }] = useRegistrationMutation()

  const onSubmit = (data: TRegistrationForm) => {
    register(_.omit(data, 'confirmationPassword'))
  }

  return (
    <ScrollView backgroundColor="white">
      <Stack space={5} paddingTop="10%">
        <MainLogo />

        <Center w="80%" alignSelf="center">
          <RegistrationForm onSubmit={onSubmit} loading={isLoading} />
        </Center>
      </Stack>
    </ScrollView>
  )
}
