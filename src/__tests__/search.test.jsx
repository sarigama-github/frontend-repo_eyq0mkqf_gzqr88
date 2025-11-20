import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

function renderApp(){
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

test('search filters animal cards by name', async () => {
  renderApp()
  const input = screen.getByLabelText(/search animals/i)
  fireEvent.change(input, { target: { value: 'tiger' } })

  const resultText = await screen.findByText(/result/i)
  expect(resultText).toHaveTextContent('1 result')
})

test('favorites toggle sets aria-pressed', async () => {
  renderApp()
  // Find a toggle favorite button on first card
  const button = await screen.findAllByRole('button', { name: /toggle favorite/i })
  fireEvent.click(button[0])
  expect(button[0]).toHaveAttribute('aria-pressed', 'true')
})
