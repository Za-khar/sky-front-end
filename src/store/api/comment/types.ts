import { TPaginationList, TPaginationPayload } from '@app/store/types'
import { TComment } from '@app/types/comment'

export type TGetCommentsPayload = {
  request: {
    articleId: string
  } & TPaginationPayload
  response: TPaginationList<TComment>
}

export type TCreateCommentPayload = {
  request: {
    articleId: string
    content: string
  }
  response: TComment
}
