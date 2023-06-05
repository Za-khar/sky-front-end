import { TMainBottomTabs } from './bottom-tabs'
import {
  TAuthStack,
  TProfileStack,
  TSearchStack,
  TArticleStack,
} from './stacks'

export type TRootNavigation = TAuthStack &
  TMainBottomTabs &
  TProfileStack &
  TSearchStack &
  TArticleStack
