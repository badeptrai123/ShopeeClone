/* eslint-disable import/no-named-as-default-member */
import axios, { AxiosError } from 'axios'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import config from 'src/constants/config'
import userImage from 'src/assets/images/userImage.png'
import { ErrorResponseApi, SuccessResponseApi } from 'src/types/utils.type'
// export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
//   return axios.isAxiosError(error)
// }
// export function isAxiosUnprocessableEntityError<FormData>(error: unknown): error is AxiosError<FormData> {
//   return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
// }

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}
export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}
export function formatCurrency(currency: number) {
  return Intl.NumberFormat('de-DE').format(currency)
}
export function formatNumberSocialType(currency: number) {
  return Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(currency).toLowerCase()
}
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + '%'

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = (name: string, id: string) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}
export const getIdFromNamId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export const getAvatarUrl = (avatarName?: string) => {
  return avatarName ? `${config.baseUrl}images/${avatarName}` : userImage
}
