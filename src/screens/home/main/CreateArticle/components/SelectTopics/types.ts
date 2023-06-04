import { TTopic } from '@app/types'

export type TSelectTopicsProps = {
  onSelect: (data: Array<TTopic>) => void
  values: Array<TTopic>
  error?: string
}
