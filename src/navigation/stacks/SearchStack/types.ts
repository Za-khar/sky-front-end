import { TArticleNavigationProps } from '@app/screens/common/Article/types'

export enum ESearchStackScreens {
  SearchMain = 'SearchMain',
  SearchArticleStack = 'ArticleStack',
}

export type TSearchStack = {
  [ESearchStackScreens.SearchMain]: undefined
  [ESearchStackScreens.SearchArticleStack]: TArticleNavigationProps
}
