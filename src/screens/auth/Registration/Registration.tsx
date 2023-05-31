import React from 'react'
import { RegistrationForm } from './components'
import { TRegistrationForm } from './components/RegistrationForm/types'
import { ScrollView, Center, Stack } from 'native-base'
import { MainLogo } from '@app/components/logos'

export const RegistrationScreen = () => {
  const onSubmit = (data: TRegistrationForm) => {
    console.log(data)
  }

  return (
    <ScrollView backgroundColor="white">
      <Stack space={5} paddingTop="25%">
        <MainLogo />

        <Center w="80%" alignSelf="center">
          <RegistrationForm onSubmit={onSubmit} />
        </Center>
      </Stack>
    </ScrollView>
  )
}
