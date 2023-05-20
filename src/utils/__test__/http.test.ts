import HttpStatusCode from 'src/constants/HttpStatusCode.enum'
import { Http } from '../http'
import { beforeEach, describe, expect, it } from 'vitest'
import { setAccessTokenToLs, setRefreshTokenToLs } from '../auth'

describe('http axios', () => {
  let http = new Http().instance
  beforeEach(() => {
    localStorage.clear()
    http = new Http().instance
  })
  const access_token_1s =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTEzVDE1OjAzOjE5LjI3OVoiLCJpYXQiOjE2ODM5OTAxOTksImV4cCI6MTY4Mzk5MDIwMH0.kosQ8Rsgwen2DYNcOO3WqKrg-6KIoDYV-pY_5r8LxuA'
  const refresh_token_1000days =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjFiOWZjNmQ3YzYyMDM0MDg1NmMyYiIsImVtYWlsIjoiYmFkYW5nMDUwOUBnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA1LTEzVDE1OjAzOjM4LjE3MVoiLCJpYXQiOjE2ODM5OTAyMTgsImV4cCI6MTY4Mzk5MzgxOH0.n4CshV40_THvuHEABYa1IBbSzcJvVUYWnC0jz2qSBXM'
  it('Gọi API', async () => {
    const res = await http.get('products')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Auth Request', async () => {
    await http.post('login', {
      email: 'badang0509@gmail.com',
      password: '123456'
    })
    const res = await http.get('me')
    // console.log(res)
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Refresh token', async () => {
    setAccessTokenToLs(access_token_1s)
    setRefreshTokenToLs(refresh_token_1000days)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
