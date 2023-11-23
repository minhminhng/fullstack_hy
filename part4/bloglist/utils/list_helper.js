const mongoose = require('mongoose')
const _ = require('lodash')
const logger = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((s, { likes }) => s = s + likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
  return new Object({
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const countBlogs = _.countBy(blogs, 'author')
  const author = _.max(Object.keys(countBlogs), o => obj[o])
  return new Object({
    author: author,
    blogs: countBlogs[author]
  })
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  const groupBlogs = _.groupBy(blogs, 'author')
  const countLikes = _.map(groupBlogs, (objs, key) => {
    return {
      author: key,
      likes: _.sumBy(objs, 'likes')
    }
  })
  // logger.info(countLikes)
  const result = _.maxBy(countLikes, 'likes')
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}