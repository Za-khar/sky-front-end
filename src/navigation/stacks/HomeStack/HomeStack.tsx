import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { EHomeStackScreens, THomeStack } from './types'
import { useTranslation } from 'react-i18next'
import { CreateArticleScreen, MainScreen } from '@app/screens/home/main'
import { Icon, IconButton } from 'native-base'
import VectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { ArticleStack } from '../ArticleStack'

const Stack = createNativeStackNavigator<THomeStack>()

export const HomeStack = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator initialRouteName={EHomeStackScreens.HomeMain}>
      <Stack.Screen
        options={({ navigation }) => ({
          headerTitle: t('home_stack'),
          headerRight: () => (
            <IconButton
              onPress={() =>
                navigation.navigate(EHomeStackScreens.CreateArticle)
              }
              icon={
                <Icon
                  as={<VectorIcon name={'plus-box-multiple'} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              }
            />
          ),
        })}
        name={EHomeStackScreens.HomeMain}
        component={MainScreen}
      />

      <Stack.Screen
        options={{
          headerTitle: t('create_article'),
        }}
        name={EHomeStackScreens.CreateArticle}
        component={CreateArticleScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={EHomeStackScreens.HomeArticleStack}
        component={ArticleStack}
      />
    </Stack.Navigator>
  )
}
