import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../App.jsx'
import { BrowserRouter } from 'react-router-dom'

describe('App', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
  })

  it('deberia renderizar <Landing>, este tiene un titulo', async () => {
    const principalTitle = screen.getByText(/videojuegos/i)

    console.log(principalTitle)

    expect(principalTitle).toMatch(/videojuegos/i)
  })
})
