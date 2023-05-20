import { beforeEach, describe, expect, it } from 'vitest'
import { clearLs, getAccessTokenFromLs, getRefreshTokenFromLs, setAccessTokenToLs, setRefreshTokenToLs } from '../auth'

const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTEzVDExOjA5OjQxLjA5MloiLCJpYXQiOjE2ODM5NzYxODEsImV4cCI6MTY4Mzk3NjE4Nn0.8-EulmspEbPp35aK3kd8ZWHsJJ9GHJdiZYk56YBhjZc'
const refresh_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTEzVDExOjA5OjQxLjA5MloiLCJpYXQiOjE2ODM5NzYxODEsImV4cCI6MTY4Mzk3OTc4MX0.N-PXp5noX4olcxqGChd_o6fZhNYa8Kgv59nCDe7-xeI'
const profile =
  '{"_id":"6421b9fc6d7c620340856c2b","roles":["User"],"email":"badang0509@gmail.com","createdAt":"2023-03-27T15:45:00.516Z","updatedAt":"2023-05-06T03:39:50.402Z","__v":0,"address":"thị xã Dĩ An , phường Đông Hòa ,tỉnh Bình Dương","date_of_birth":"1999-09-04T17:00:00.000Z","name":"Duc Ba","phone":"0935722384","avatar":"82d66d6a-5e95-4c39-a152-628c4367f227.jpg"}'

beforeEach(() => {
  localStorage.clear()
})
describe('setAccessTokenToLs', () => {
  it('access_token đươc xét vào localstorage', () => {
    setAccessTokenToLs(access_token)
    expect(getAccessTokenFromLs()).toBe(access_token)
  })
})

describe('setRefreshTokenToLs', () => {
  it('refresh_token đươc xét vào localstorage', () => {
    setRefreshTokenToLs(refresh_token)
    expect(getRefreshTokenFromLs()).toEqual(refresh_token)
  })
})
describe('clearLS', () => {
  it('Xoa het access_token, refresh_token, profile ra khoi localstorage', () => {
    setRefreshTokenToLs(refresh_token)
    setAccessTokenToLs(access_token)
    clearLs()
    expect(getRefreshTokenFromLs()).toBe('')
    expect(getAccessTokenFromLs()).toBe('')
  })
})
