import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useTranslation } from 'react-i18next'
import { DescriptionInfo } from '../DescriptionInfo/DescriptionInfo'
import { ArticleLayout, TopicLayout } from '@app/components/layouts'
import { useTypedSelector } from '@app/store/store'

const Tab = createMaterialTopTabNavigator()

export const ProfileTabs = () => {
  const { t } = useTranslation()
  const { user } = useTypedSelector((store) => store.userState)

  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: t('my_articles'),
        }}
        name="OwnArticles"
      >
        {() => <ArticleLayout userId={user?.id} />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarLabel: t('my_topics'),
        }}
        name="OwnTopics"
      >
        {() => <TopicLayout userId={user?.id} />}
      </Tab.Screen>
      <Tab.Screen
        name="Description"
        options={{
          tabBarLabel: t('description'),
        }}
        component={DescriptionInfo}
      />
    </Tab.Navigator>
  )
}
