import { TPaginationList, TPaginationPayload } from '@app/store/types'
import { TArticle } from '@app/types/article'

export type TGetArticlesPayload = {
  request: {
    userId?: string
    topicId?: string
  } & TPaginationPayload
  response: TPaginationList<TArticle>
}

export type TCreateArticlePayload = {
  request: {
    title: string
    text: string
    topics: Array<string>
  }
  response: TArticle
}
