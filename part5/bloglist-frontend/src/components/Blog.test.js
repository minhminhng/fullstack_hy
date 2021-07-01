import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    author: 'Marc Levy',
    title: 'All those things we never said',
    url: 'https://www.goodreads.com/book/show/34385326-all-those-things-we-never-said',
    likes: 345,
    user: '60d0e27cbb3b6836e85171af'
  }

  const user={
    name: 'Amanda Theodore',
    username: 'amathe'
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog user={user} blog={blog} />
    )
  })
  // component.debug()

  test('at start renders author and title', () => {
    expect(component.container).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('at start renders without url', () => {
    expect(component.container).not.toHaveTextContent(`${blog.url}`)
  })

  test('at start renders without likes', () => {
    expect(component.container).not.toHaveTextContent(`${blog.likes}`)
  })

  test('at start renders with view', () => {
    expect(component.getByText('view')).toBeDefined()
    // expect(btn).toHaveTextContent('view')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).not.toHaveTextContent(`${blog.likes}`)
  })
})