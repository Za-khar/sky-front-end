import { TArticle } from '@app/types/article'

export type TArticleCardProps = {
  data: TArticle
  onPress?: (data: TArticle) => void
}
