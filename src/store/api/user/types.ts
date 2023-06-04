import { TUser } from '@app/types'

export type TGetProfilePayload = {
  request: null
  response: TUser
}

export type TUpdateProfilePayload = {
  request: Partial<{
    login: string
    password: string
    oldPassword: string
    name: string
    surname: string
    description: string
    avatar: string
  }>
  response: TUser
}

export type TDeleteProfilePayload = {
  request: void
  response: { status: 'ok' }
}
