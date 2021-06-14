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
    const name = _.max(Object.keys(countBlogs), o => obj[o])    
    return new Object({
        author: name,
        blogs: countBlogs[name]
      })         
}

const mostLikes = (blogs) => {
    let groups = _.groupBy(blogs,'author')

    const totalLikes = _.map(groups, function(objs, key) {
        return {
            author: key,
            likes: _.sumBy(objs, 'likes')
        }      
    })
    const result = _.maxBy(totalLikes, 'likes')

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
 }