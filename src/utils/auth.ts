import { User } from 'src/types/user.type'

export const setAccessTokenToLs = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const setRefreshTokenToLs = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessTokenFromLs = () => {
  return localStorage.getItem('access_token') || ''
}
export const getRefreshTokenFromLs = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const LocalStorageEventTarget = new EventTarget()

export const clearLs = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
  const clearEvent = new Event('clearLS')
  LocalStorageEventTarget.dispatchEvent(clearEvent)
}
export const getProfileFromLs = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLs = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
