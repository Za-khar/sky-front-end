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

export type TDeleteArticlePayload = {
  request: {
    articleId: string
  }
  response: TArticle & { userId: string }
}

export type TGetArticleByIdPayload = {
  request: {
    articleId: string
  }
  response: TArticle
}

export type TRateArticlePayload = {
  request: {
    articleId: string
    isLiked: boolean
  }
  response: { status: 'ok' }
}
