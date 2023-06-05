import { TArticleNavigationProps } from '@app/screens/common/Article/types'

export enum EProfileStackScreens {
  ProfileMain = 'ProfileMain',
  ProfileEdit = 'ProfileEdit',
  ChangePassword = 'ChangePassword',
  ProfileArticleStack = 'ArticleStack',
}

export type TProfileStack = {
  [EProfileStackScreens.ProfileMain]: undefined
  [EProfileStackScreens.ProfileEdit]: undefined
  [EProfileStackScreens.ChangePassword]: undefined
  [EProfileStackScreens.ProfileArticleStack]: TArticleNavigationProps
}
