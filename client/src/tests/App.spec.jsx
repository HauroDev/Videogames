import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../App.jsx'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })
  it('deberia renderizar <Landing>, este tiene un titulo', () => {
    expect(screen.getByRole('heading'))
  })

  it('deberia renderizar <Home> al clickear un boton', async () => {
    const button = await screen.findByText(/click para entrar/i)
    fireEvent.click(button)

    const text = await screen.findByText(/delta/i)

    expect(text).toHaveTextContent(/videojuegos/i)
  })
})
