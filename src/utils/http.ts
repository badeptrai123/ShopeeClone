import { AuthResponse, RefreshTokenResponse } from './../types/auth.type'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import axios, { AxiosError, InternalAxiosRequestConfig, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import {
  clearLs,
  getAccessTokenFromLs,
  getRefreshTokenFromLs,
  setAccessTokenToLs,
  setProfileToLs,
  setRefreshTokenToLs
} from './auth'

import config from 'src/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'
import { ErrorResponseApi } from 'src/types/utils.type'

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLs()
    this.refreshToken = getRefreshTokenFromLs()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 5,
        'expire-refresh-token': 60 * 60
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = this.accessToken
          return config
        }
        return config
      },
      function (error) {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLs(this.accessToken)
          setRefreshTokenToLs(this.refreshToken)
          setProfileToLs(data.data.user)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLs()
        }

        return response
      },
      (error: AxiosError) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data

          const message = data?.message || error.message
          toast(message)
        }
        if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error)) {
          // Truong hop token het han va request do k phai la request refresh token
          // thi chung ta tien hanh goi refresh_token
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig)

          const { url } = config
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghia la chung ta tiep tuc goi lai request cu vua bi loi
              return this.instance({ ...config, headers: { ...config.headers, authorization: access_token } })
            })
          }
          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message
          clearLs()
          this.accessToken = ''
          this.refreshToken = ''
          toast(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLs(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLs()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}
const http = new Http().instance
export default http
