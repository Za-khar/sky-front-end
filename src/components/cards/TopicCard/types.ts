import { TTopic } from '@app/types'
import React from 'react'

export type TTopicCard = {
  data: TTopic
  renderButton?: (data: TTopic) => React.ReactElement
}
