import { ArticleLayout } from '@app/components/layouts'
import { useGetTopicsQuery } from '@app/store/api/topic'
import { useTypedSelector } from '@app/store/store'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Box } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Tab = createMaterialTopTabNavigator()

export const MainScreen = () => {
  const { t } = useTranslation()
  const { user } = useTypedSelector((store) => store.userState)
  const { data } = useGetTopicsQuery({ userId: user?.id, skip: 0 })

  return (
    <>
      <Box flex={1}>
        <Tab.Navigator
          overScrollMode="auto"
          screenOptions={{
            tabBarScrollEnabled: true,
          }}
        >
          <Tab.Screen
            name={'AllArticles'}
            options={{
              tabBarLabel: t('newest'),
            }}
          >
            {() => <ArticleLayout />}
          </Tab.Screen>

          {data?.models?.map((topic) => (
            <Tab.Screen
              key={topic.id}
              name={topic.id}
              options={{
                tabBarLabel: topic.title,
              }}
            >
              {() => <ArticleLayout topicId={topic.id} />}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </Box>
    </>
  )
}
