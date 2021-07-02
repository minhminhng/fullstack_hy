import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

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

const likeHandler = jest.fn()

let component

beforeEach(() => {
  component = render(
    <Blog user={user} blog={blog} update={likeHandler}/>
  )
})
// component.debug()

test('at start renders only author and title', () => {
  const div = component.container.querySelector('.blogView')
  expect(div).toHaveStyle('display: none')
})

test('after clicking the button, children are displayed', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogView')
  expect(div).not.toHaveStyle('display: none')
})

test('button like', () => {
  const like = component.getByText('like')
  expect(like).toBeDefined()
})

test('button like is clicked twice', () => {
  const btnLike = component.getByText('like')
  fireEvent.click(btnLike)
  fireEvent.click(btnLike)

  expect(likeHandler.mock.calls).toHaveLength(2)
})


