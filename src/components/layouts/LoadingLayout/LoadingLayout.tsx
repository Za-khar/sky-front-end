import React from 'react'
import Lottie from 'lottie-react-native'
import { Box } from 'native-base'

export const LoadingLayout = () => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Lottie
        source={require('@app/assets/lottie/cloud.json')}
        autoPlay
        speed={1}
        useNativeLooping
      />
    </Box>
  )
}
