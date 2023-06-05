import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthStack } from './stacks'
import { MainBottomTabs } from './bottom-tabs'
import { useTypedSelector } from '@app/store/store'
import { useGetProfileQuery } from '@app/store/api/user'
import { LoadingLayout } from '@app/components/layouts'

export const RootNavigation = () => {
  const logined = !!useTypedSelector((store) => store.userState.user?.id)
  const { isLoading, isFetching } = useGetProfileQuery(null)

  if (isLoading || isFetching) {
    return <LoadingLayout />
  }

  return (
    <NavigationContainer>
      {logined ? <MainBottomTabs /> : <AuthStack />}
    </NavigationContainer>
  )
}
