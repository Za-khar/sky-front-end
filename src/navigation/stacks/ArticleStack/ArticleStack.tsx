import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { EArticleStackScreens, TArticleStack } from './types'
import { ArticleScreen, CommentsScreen } from '@app/screens/common'
import { useTranslation } from 'react-i18next'

const Stack = createNativeStackNavigator<TArticleStack>()

export const ArticleStack = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName={EArticleStackScreens.Article}>
      <Stack.Screen
        options={{
          headerTitle: '',
        }}
        name={EArticleStackScreens.Article}
        component={ArticleScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: t('comments'),
        }}
        name={EArticleStackScreens.Comments}
        component={CommentsScreen}
      />
    </Stack.Navigator>
  )
}
