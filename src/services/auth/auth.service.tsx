import { AxiosResponse } from 'axios'
import AxiosConfig from '../AxiosConfig'
import { Auth } from './auth.interface'

export class AuthService {
  getTokens(data: any): Promise<Auth> {
    return AxiosConfig.post('token/', data, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response: AxiosResponse<Auth>) => response.data)
  }

  refreshTokens(refresh: string): Promise<Auth> {
    return AxiosConfig.post('token/refresh/', {
      refresh: refresh
    }).then((response: AxiosResponse<Auth>) => response.data)
  }
}