import { screen, waitFor, fireEvent } from '@testing-library/react'
import { path } from 'src/constants/path'
import { logScreen, renderWithRoute } from 'src/utils/testUtils'
import { describe, it, expect, beforeAll } from 'vitest'
import matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)
describe('Login', () => {
  let submitButton: HTMLButtonElement
  let emailInput: HTMLElement
  let passwordInput: HTMLElement
  beforeAll(async () => {
    renderWithRoute({ route: path.login })
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Email')).toBeInTheDocument()
    })
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    emailInput = screen.getByPlaceholderText('Email')
    passwordInput = screen.getByPlaceholderText('Password')
  })
  it('Hiển thị lỗi require khi không nhập gì', async () => {
    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email không được để trống')).toBeTruthy()
      expect(screen.queryByText('Password không được để trống')).toBeTruthy()
    })
  })
  it('Hiển thị lỗi khi value input nhập sai', async () => {
    // const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement
    // const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement
    fireEvent.input(emailInput, {
      target: {
        value: 'badang0509'
      }
    })
    fireEvent.input(passwordInput, {
      target: {
        value: '123'
      }
    })

    fireEvent.submit(submitButton)
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeTruthy()
      expect(screen.queryByText('Độ dài Password từ 6-160 kí tự')).toBeTruthy()
    })
  })
  it('Không nên hiển thị lỗi khi nhập lại value đúng', async () => {
    fireEvent.input(emailInput, {
      target: {
        value: 'badang0509@gmail.com'
      }
    })
    fireEvent.input(passwordInput, {
      target: {
        value: '123456'
      }
    })
    await waitFor(() => {
      expect(screen.queryByText('Email không đúng định dạng')).toBeFalsy()
      expect(screen.queryByText('Độ dài Password từ 6-160 kí tự')).toBeFalsy()
    })

    fireEvent.submit(submitButton)
    await logScreen()
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })
  })
})
