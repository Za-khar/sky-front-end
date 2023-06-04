import { TTopic } from './topic'

export type TArticle = {
  id: string
  title: string
  text: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    surname: string
    avatar: null | string
  }
  topics: Array<TTopic>
  likesCount: 0
  liked?: boolean
}
