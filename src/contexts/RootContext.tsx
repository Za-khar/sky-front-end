import React, { PropsWithChildren } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { styles } from './styles'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const RootContext = ({ children }: PropsWithChildren) => {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#E3F2F9',
        100: '#C5E4F3',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  })
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <GestureHandlerRootView style={styles.safeAreaStyle}>
          <SafeAreaView style={styles.safeAreaStyle}>{children}</SafeAreaView>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </SafeAreaProvider>
  )
}
