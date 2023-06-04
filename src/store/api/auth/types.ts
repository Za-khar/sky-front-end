import { TTokens, TUser } from '@app/types'

export type TLoginPayload = {
  request: {
    login: string
    password: string
  }

  response: TUser & TTokens
}

export type TRegistrationPayload = {
  request: {
    login: string
    password: string
    name: string
    surname: string
  }
  response: TUser & TTokens
}
