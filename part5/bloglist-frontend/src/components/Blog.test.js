import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const user ={
    name: 'MNg',
    username: 'MNg'
  }
  const blog = {
    title: 'This is a blog',
    author: 'Mi Ng',
    url: 'https://www.google.com',
    likes: 0,
    user: user
  }
  const mockHandler = jest.fn()
  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} updateLikes={mockHandler} />
    ).container
  })

  test('renders a blog', () => {
    const element = screen.getByText('This is a blog Mi Ng')
    expect(element).toBeDefined()

    const detail = container.querySelector('.blog-details')
    expect(detail).toHaveStyle('display: none')
  })

  test('show blog details', async () => {
    const userE = userEvent.setup()
    const button = screen.getByText('view')
    await userE.click(button)

    const detail = container.querySelector('.blog-details')
    expect(detail).not.toHaveStyle('display: none')
  })

  test('clicking the button calls event handler once', async () => {
    const userE = userEvent.setup()
    const button = screen.getByText('like')
    await userE.click(button)
    await userE.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})