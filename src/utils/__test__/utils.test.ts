import { AxiosError, isAxiosError } from 'axios'
import { describe, it, expect } from 'vitest'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError, isAxiosUnprocessableEntityError } from '../utils'
import HttpStatusCode from 'src/constants/HttpStatusCode.enum'

describe('isAxiosError', () => {
  it('isAxiosError trả về boolean', () => {
    expect(isAxiosError(new Error())).toBe(false)
    expect(isAxiosError(new AxiosError())).toBe(true)
  })
})

describe('isAxiosUnprocessableEntityError', () => {
  it('isAxiosUnprocessableEntityError trả về boolean', () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError
        } as any)
      )
    ).toBe(false)
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity
        } as any)
      )
    ).toBe(true)
  })
})
describe('isAxiosExpiredTokenError', () => {
  it('isAxiosExpiredTokenError trả về boolean', () => {
    expect(isAxiosExpiredTokenError(new Error())).toBe(false)
    expect(isAxiosExpiredTokenError(isAxiosUnauthorizedError(new Error()))).toBe(false)
  })
})
