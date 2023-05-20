import { SuccessResponseApi } from 'src/types/utils.type'
import { User } from './user.type'

export type AuthResponse = SuccessResponseApi<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>

export type RefreshTokenResponse = SuccessResponseApi<{ access_token: string }>
