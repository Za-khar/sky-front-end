import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { ESearchStackScreens, TSearchStack } from './types'
import { useTranslation } from 'react-i18next'
import { SearchMainScreen } from '@app/screens/home/search'

const Stack = createNativeStackNavigator<TSearchStack>()

export const SearchStack = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName={ESearchStackScreens.SearchMain}>
      <Stack.Screen
        options={{
          headerTitle: t('search_stack'),
        }}
        name={ESearchStackScreens.SearchMain}
        component={SearchMainScreen}
      />
    </Stack.Navigator>
  )
}
