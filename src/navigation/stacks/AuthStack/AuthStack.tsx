import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { EAuthStackScreens, TAuthStack } from './types'
import { LoginScreen, RegistrationScreen } from '@app/screens/auth'

const Stack = createNativeStackNavigator<TAuthStack>()

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={EAuthStackScreens.Login} component={LoginScreen} />
      <Stack.Screen
        name={EAuthStackScreens.Registration}
        component={RegistrationScreen}
      />
    </Stack.Navigator>
  )
}
