import * as Keychain from 'react-native-keychain'
import { TTokens } from '@app/types'
import { AxiosResponse } from 'axios'
import { store } from '@app/store/store'
import { userActions } from '@app/store/slice'
import { apiPublic } from '@app/store/axiosApi'

class AuthService {
  private static refreshKey = 'refreshToken'
  private static accessKey = 'accessToken'

  public async getAccessToken(): Promise<string | null> {
    try {
      const accessToken = await Keychain.getGenericPassword({
        service: AuthService.accessKey,
      })

      if (!accessToken) {
        return null
      }

      return accessToken.password
    } catch {
      await this.logout()
      return null
    }
  }

  public async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await Keychain.getGenericPassword({
        service: AuthService.refreshKey,
      })

      if (!refreshToken) {
        return null
      }

      const { data }: AxiosResponse<TTokens> = await apiPublic.post(
        `/auth/refresh-token`,
        {
          refreshToken: refreshToken.password,
        },
      )

      await this.setTokens(data)

      return data.accessToken
    } catch {
      await this.logout()
      return null
    }
  }

  public async setTokens({ refreshToken, accessToken }: TTokens) {
    try {
      await Keychain.setGenericPassword(AuthService.refreshKey, refreshToken, {
        service: AuthService.refreshKey,
      })
      await Keychain.setGenericPassword(AuthService.accessKey, accessToken, {
        service: AuthService.accessKey,
      })
    } catch {
      await this.logout()
    }
  }

  public async logout(): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword({
        service: AuthService.refreshKey,
      })
      await Keychain.resetGenericPassword({
        service: AuthService.accessKey,
      })
      store.dispatch(userActions.logoutAction())
      return true
    } catch {
      return false
    }
  }
}

export default new AuthService()
