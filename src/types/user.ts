export type TUser = {
  id: string
  login: string
  name: string
  surname: string
  avatar: null | string
  description: null | string
  createdAt: string
  updatedAt: string
}

export type TTokens = {
  refreshToken: string
  accessToken: string
}
