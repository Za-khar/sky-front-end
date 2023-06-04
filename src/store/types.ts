export type TPaginationPayload = {
  skip?: number
  take?: number
  sortBy?: string
  order?: 'ASC' | 'DESC'
  searchTerm?: string
}

export type TPaginationList<T> = {
  totalCount: number
  models: Array<T>
}
