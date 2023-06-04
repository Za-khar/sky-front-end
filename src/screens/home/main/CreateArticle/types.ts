import { TTopic } from '@app/types'

export type TCreateArticleForm = {
  title: string
  text: string
  topics: Array<TTopic>
}
