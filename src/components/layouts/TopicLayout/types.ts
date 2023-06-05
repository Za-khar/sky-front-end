import { TTopic } from '@app/types'

export type TTopicLayoutProps = {
  userId?: string
  renderButton?: (data: TTopic) => React.ReactElement
  withSearch?: boolean
}
