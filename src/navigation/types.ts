import { TMainBottomTabs } from './bottom-tabs'
import { TAuthStack, TProfileStack, TSearchStack } from './stacks'

export type TRootNavigation = TAuthStack &
  TMainBottomTabs &
  TProfileStack &
  TSearchStack &
  TProfileStack
