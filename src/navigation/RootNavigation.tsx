import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './stacks'

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  )
}
