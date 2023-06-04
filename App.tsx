/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { RootNavigation } from './src/navigation'
import { RootContext } from '@app/contexts'
import { Provider } from 'react-redux'
import { store } from '@app/store/store'
import Toast from 'react-native-toast-message'

export const App = () => {
  return (
    <Provider store={store}>
      <RootContext>
        <RootNavigation />
        <Toast />
      </RootContext>
    </Provider>
  )
}
