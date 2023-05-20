import { rest } from 'msw'
import config from 'src/constants/config'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'

export const access_token_1s =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTEzVDE1OjAzOjE5LjI3OVoiLCJpYXQiOjE2ODM5OTAxOTksImV4cCI6MTY4Mzk5MDIwMH0.kosQ8Rsgwen2DYNcOO3WqKrg-6KIoDYV-pY_5r8LxuA'
export const refresh_token_1000days =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTEzVDE1OjAzOjM4LjE3MVoiLCJpYXQiOjE2ODM5OTAyMTgsImV4cCI6MTY4Mzk5MzgxOH0.n4CshV40_THvuHEABYa1IBbSzcJvVUYWnC0jz2qSBXM'
export const access_token =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTE1VDExOjQyOjEyLjA4NFoiLCJpYXQiOjE2ODQxNTA5MzIsImV4cCI6MTY4NTE1MDkzMX0.fdcBAa3e8dn-5Lg_H3E3y9Zre97sW7TczBWXg4rNTOg'
const loginRes = {
  message: 'Đăng nhập thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTE1VDA3OjE2OjA1LjkzN1oiLCJpYXQiOjE2ODQxMzQ5NjUsImV4cCI6MTY5NDEzNDk2NH0.PCEKmV20Nnd_TNg6pY1LhRqBeXiMvPVk6rvrxFgMtd8',
    expires: 9999999,
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTE1VDA3OjE2OjA1LjkzN1oiLCJpYXQiOjE2ODQxMzQ5NjUsImV4cCI6MTc3MDUzNDk2NX0.xug00VmlYP_k_BMKB6f3d29wXmH-m2g7B6FCFZTiOyk',
    expires_refresh_token: 86400000,
    user: {
      _id: '6421b9fc6d7c620340856c2b',
      roles: ['User'],
      email: 'badang0509@gmail.com',
      createdAt: '2023-03-27T15:45:00.516Z',
      updatedAt: '2023-05-06T03:39:50.402Z',
      __v: 0,
      address: 'thị xã Dĩ An , phường Đông Hòa ,tỉnh Bình Dương',
      date_of_birth: '1999-09-04T17:00:00.000Z',
      name: 'Duc Ba',
      phone: '0935722384',
      avatar: '82d66d6a-5e95-4c39-a152-628c4367f227.jpg'
    }
  }
}
const refreshTokenRes = {
  message: 'Refresh Token thành công',
  data: {
    access_token:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmY5MzVlNWZkYzVmMDM3ZTZmNjhkMyIsImVtYWlsIjoiZDNAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMi0xMi0xOVQwNzozMTowMC4yNTJaIiwiaWF0IjoxNjcxNDM1MDYwLCJleHAiOjE2NzIwMzk4NjB9.vTHglpuxad5h_CPpIaDCUpW0xJPYarJzLFeeul0W61E'
  }
}

const loginRequest = rest.post(`${config.baseUrl}login`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(loginRes))
})

const refreshTokenRequest = rest.post(`${config.baseUrl}refresh-access-token`, (req, res, ctx) => {
  return res(ctx.status(HttpStatusCode.Ok), ctx.json(refreshTokenRes))
})

const authRequests = [loginRequest, refreshTokenRequest]
export default authRequests
