const logger = require('./logger')
const _ = require('lodash')
const mongoose = require('mongoose')
const dummy = (blogs) => {
    return 1
}

const totalLikes= (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.likes
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {    
    const reducer = (final, current) => {
        // logger.info(final.likes)
        // logger.info(current.like)
        return final.likes > current.likes ? final : current
    }
    const favorite = blogs.reduce(reducer, 0)
    // logger.info(favorite.title)
    return new Object({
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    })
}

const mostBlogs = (blogs) => {
    const countBlogs = _.countBy(blogs, 'author')
    // logger.info(countBlogs)
    const name = _.max(Object.keys(countBlogs), o => obj[o])    
    return new Object({
        author: name,
        blogs: countBlogs[name]
      })         
}

const mostLikes = (blogs) => {
    const groups = _.groupBy(blogs, 'author')
    const maxLikes = _.forEach(groups, function() {
        _.sumBy(groups, 'likes')
    })
    logger.info(maxLikes)
    // const blog = _.max(Object.keys(countBlogs), o => obj[o])
    return 0
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
 }