import { TPaginationList, TPaginationPayload } from '@app/store/types'
import { TTopic } from '@app/types'

export type TGetTopicsPayload = {
  request: { userId?: string } & TPaginationPayload
  response: TPaginationList<TTopic>
}

export type TUpdateMyTopic = {
  request: {
    userId: string
    topic: string
    action: 'save' | 'unsave'
  }
  response: TTopic
}
