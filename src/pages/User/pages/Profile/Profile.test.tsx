import { waitFor, screen } from '@testing-library/react'
import { path } from 'src/constants/path'
import { access_token } from 'src/msw/auth.msw'
import { setAccessTokenToLs } from 'src/utils/auth'
import { renderWithRoute } from 'src/utils/testUtils'
import { describe, expect, it } from 'vitest'

describe('Profile', () => {
  it('Hien thi trang profile', async () => {
    setAccessTokenToLs(access_token)
    renderWithRoute({ route: path.profile })
    await waitFor(async () => {
      expect(await screen.findByText('d3@gmail.com')).toBeTruthy()
    })
  })
})
