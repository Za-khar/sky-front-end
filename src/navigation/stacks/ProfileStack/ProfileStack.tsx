import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { EProfileStackScreens, TProfileStack } from './types'
import {
  ProfileMainScreen,
  ProfileEditScreen,
  ChangePasswordScreen,
} from '@app/screens/home/profile'
import { useTranslation } from 'react-i18next'
import { ArticleStack } from '../ArticleStack'

const Stack = createNativeStackNavigator<TProfileStack>()

export const ProfileStack = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName={EProfileStackScreens.ProfileMain}>
      <Stack.Screen
        options={{
          headerTitle: t('profile_stack'),
        }}
        name={EProfileStackScreens.ProfileMain}
        component={ProfileMainScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: t('profile_edit'),
        }}
        name={EProfileStackScreens.ProfileEdit}
        component={ProfileEditScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: t('change_password'),
        }}
        name={EProfileStackScreens.ChangePassword}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={EProfileStackScreens.ProfileArticleStack}
        component={ArticleStack}
      />
    </Stack.Navigator>
  )
}
