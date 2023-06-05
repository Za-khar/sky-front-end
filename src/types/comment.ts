import { TArticle } from './article'
import { TUser } from './user'

export type TComment = {
  id: string
  content: string
  article: TArticle
  user: TUser
  createdAt: string
  updatedAt: string
}
