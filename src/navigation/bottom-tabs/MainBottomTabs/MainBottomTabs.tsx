import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { EMainBottomTabsStacks, TMainBottomTabs } from './types'
import { useTranslation } from 'react-i18next'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'native-base'
import {
  EHomeStackScreens,
  EProfileStackScreens,
  ESearchStackScreens,
  HomeStack,
  ProfileStack,
  SearchStack,
} from '@app/navigation/stacks'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

const screensWithBottomTabs: Array<string> = [
  EMainBottomTabsStacks.MainStack,
  EMainBottomTabsStacks.SearchStack,
  EMainBottomTabsStacks.ProfileStack,
  EProfileStackScreens.ProfileMain,
  EHomeStackScreens.HomeMain,
  ESearchStackScreens.SearchMain,
]

const Tab = createBottomTabNavigator<TMainBottomTabs>()

export const MainBottomTabs = () => {
  const { t } = useTranslation()

  const { colors } = useTheme()

  return (
    <Tab.Navigator initialRouteName={EMainBottomTabsStacks.ProfileStack}>
      <Tab.Screen
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ''

            if (routeName && !screensWithBottomTabs.includes(routeName)) {
              return { display: 'none' }
            }
            return { display: 'flex' }
          })(route),

          headerShown: false,
          tabBarLabel: t('home_stack'),
          headerTitle: t('home_stack'),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              name="home"
              size={30}
              color={focused ? colors.primary[600] : colors.muted[300]}
            />
          ),
          tabBarActiveTintColor: colors.primary[600],
          tabBarInactiveTintColor: colors.muted[300],
        })}
        name={EMainBottomTabsStacks.MainStack}
        component={HomeStack}
      />
      <Tab.Screen
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ''

            if (routeName && !screensWithBottomTabs.includes(routeName)) {
              return { display: 'none' }
            }
            return { display: 'flex' }
          })(route),

          headerShown: false,
          tabBarLabel: t('search_stack'),
          headerTitle: t('search_stack'),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              name="text-box-search"
              size={30}
              color={focused ? colors.primary[600] : colors.muted[300]}
            />
          ),
          tabBarActiveTintColor: colors.primary[600],
          tabBarInactiveTintColor: colors.muted[300],
        })}
        name={EMainBottomTabsStacks.SearchStack}
        component={SearchStack}
      />

      <Tab.Screen
        options={({ route }) => ({
          tabBarStyle: ((route) => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? ''

            if (routeName && !screensWithBottomTabs.includes(routeName)) {
              return { display: 'none' }
            }
            return { display: 'flex' }
          })(route),

          headerShown: false,
          tabBarLabel: t('profile_stack'),
          tabBarIcon: ({ focused }) => (
            <VectorIcon
              name="account-cowboy-hat"
              size={30}
              color={focused ? colors.primary[600] : colors.muted[300]}
            />
          ),
          tabBarActiveTintColor: colors.primary[600],
          tabBarInactiveTintColor: colors.muted[300],
        })}
        name={EMainBottomTabsStacks.ProfileStack}
        component={ProfileStack}
      />
    </Tab.Navigator>
  )
}
