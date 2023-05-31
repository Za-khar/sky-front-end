/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { RootNavigation } from './src/navigation'
import { RootContext } from '@app/contexts'

export const App = () => {
  return (
    <RootContext>
      <RootNavigation />
    </RootContext>
  )
}
