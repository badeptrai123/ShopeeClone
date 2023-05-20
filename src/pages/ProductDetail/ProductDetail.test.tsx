import { delay, renderWithRoute } from 'src/utils/testUtils'
import { describe, it, expect } from 'vitest'

describe('ProductDetail', () => {
  it('Render UI ProductDetai', async () => {
    renderWithRoute({ route: '/Điện-Thoại-Vsmart-Active-3-6GB64GB--Hàng-Chính-Hãng-i-60afb2c76ef5b902180aacba' })
    await delay(1000)
    expect(document.body).toMatchSnapshot()
  })
})
