import { screen, waitFor } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'
import { expect, describe, test } from 'vitest'
import { renderWithRoute } from './utils/testUtils'
import { path } from './constants/path'

expect.extend(matchers)

describe('App', () => {
  test('App render va chuyen trang', async () => {
    const { user } = renderWithRoute()
    // verify vao dung trang chu
    await waitFor(() => {
      expect(document.querySelector('title')?.textContent).toBe('Trang chủ | Shopee Clone')
    })

    // //verify chuyen sang trang login
    // user.click(screen.getByText('Đăng nhập'))
    // await waitFor(() => {
    //   expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
    //   expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    // })
    // Verify chuyển sang trang login
    await user.click(screen.getByText(/Đăng nhập/i))
    await waitFor(() => {
      expect(screen.queryByText('Bạn chưa có tài khoản?')).toBeInTheDocument()
      expect(document.querySelector('title')?.textContent).toBe('Đăng nhập | Shopee Clone')
    })
  })
  test('Ve trang not found', async () => {
    const badRoute = '/some/bad/route'
    renderWithRoute({ route: badRoute })
    // render(
    //   <MemoryRouter initialEntries={[badRoute]}>
    //     <App />
    //   </MemoryRouter>
    // )
    await waitFor(() => {
      expect(screen.getByText(/404/i)).toBeInTheDocument()
    })
  })
  test('Render trang register', async () => {
    renderWithRoute({ route: path.register })
    // render(
    //   <MemoryRouter initialEntries={[path.register]}>
    //     <App />
    //   </MemoryRouter>
    // )
    await waitFor(() => {
      expect(screen.queryByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument()
    })
  })
})
