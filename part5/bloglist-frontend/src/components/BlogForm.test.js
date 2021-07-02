import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('blog form test', () => {
  const blog = {
    author: 'Marc Levy',
    title: 'All those things we never said',
    url: 'https://www.goodreads.com/book/show/34385326-all-those-things-we-never-said',
    likes: 345,
    user: '60d0e27cbb3b6836e85171af'
  }

  const user = {
    name: 'Amanda Theodore',
    username: 'amathe'
  }

  const createHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <BlogForm user={user} createBlog={createHandler} />
    )
  })

  test('access title', () => {
    const title = component.container.querySelector("input[name='title']")
    const form = component.container.querySelector('form')

    fireEvent.change(title, { target: { value: blog.title } })
    fireEvent.submit(form)

    expect(createHandler.mock.calls[0][0].title).toBe(`${blog.title}`)
  })

  test('access author', () => {
    const author = component.container.querySelector("input[name='author']")
    const form = component.container.querySelector('form')

    fireEvent.change(author, { target: { value: blog.author } })
    fireEvent.submit(form)

    expect(createHandler.mock.calls[0][0].author).toBe(`${blog.author}`)
  })

  test('access url', () => {
    const url = component.container.querySelector("input[name='url']")
    const form = component.container.querySelector('form')

    fireEvent.change(url, { target: { value: blog.url } })
    fireEvent.submit(form)

    expect(createHandler.mock.calls[0][0].url).toBe(`${blog.url}`)
  })
})