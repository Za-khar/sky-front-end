import { TArticleNavigationProps } from '@app/screens/common/Article/types'
import { TCommentsNavigationProps } from '@app/screens/common/Comments/types'

export enum EArticleStackScreens {
  Article = 'Article',
  Comments = 'Comments',
}

export type TArticleStack = {
  [EArticleStackScreens.Article]: TArticleNavigationProps
  [EArticleStackScreens.Comments]: TCommentsNavigationProps
}
