import { TRootNavigation } from '@app/navigation'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TRootNavigation {}
  }
}
