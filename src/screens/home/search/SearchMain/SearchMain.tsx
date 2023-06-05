import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTranslation } from 'react-i18next'
import { TopicLayout, ArticleLayout } from '@app/components/layouts'
import { Box } from 'native-base'

const Tab = createMaterialTopTabNavigator()

export const SearchMainScreen = () => {
  const { t } = useTranslation()

  return (
    <Box flex={1}>
      <Tab.Navigator>
        <Tab.Screen
          name="Articles"
          options={{
            tabBarLabel: t('articles'),
          }}
        >
          {() => <ArticleLayout withSearch />}
        </Tab.Screen>

        <Tab.Screen
          options={{
            tabBarLabel: t('topics'),
          }}
          name="Topics"
        >
          {() => <TopicLayout withSearch />}
        </Tab.Screen>
      </Tab.Navigator>
    </Box>
  )
}
