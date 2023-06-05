import { TArticleNavigationProps } from '@app/screens/common/Article/types'

export enum EHomeStackScreens {
  HomeMain = 'HomeMain',
  CreateArticle = 'CreateArticle',
  HomeArticleStack = 'ArticleStack',
}

export type THomeStack = {
  [EHomeStackScreens.HomeMain]: undefined
  [EHomeStackScreens.CreateArticle]: undefined
  [EHomeStackScreens.HomeArticleStack]: TArticleNavigationProps
}
