const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', { username:1, name:1 })  
    response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/', userExtractor, async(request, response, next) => {
    const body = request.body

    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // if (body.userId != request.user) {
    //   return response.status(401).json({ error: 'wrong user'})
    // }

    const user = await User.findById(request.user)
    

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog)
    } catch (exception) {
      next(exception)
    }
})

blogsRouter.get('/:id', async(request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }    
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', userExtractor, async(request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog === null) {
      return response.status(204).end()
    }

    if (blog.user.toString() === request.user) {
      await Blog.findByIdAndRemove(request.params.id)      
      response.status(204).end()
    } else {
      console.log('wrong user')
      return response.status(403).json({ error: 'wrong user'})
    }
})

blogsRouter.put('/:id', userExtractor, async(request, response, next) => {
  const blog = new Blog(request.body)  
  
  try {     
    // have to write the parameters of the body explicitly, otherwise, the update include _id
    // and will throw an exception for immutable _id
    // Option 1
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
    {      
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes      
    })
    //// Option 2
    // const updatedBlog = await Blog.findOneAndUpdate({_id:request.params.id},{
    //   $set:{      
    //       title: blog.title,
    //       author: blog.author,
    //       url: blog.url,
    //       likes: blog.likes
    //   } 
    // })  
    response.json(updatedBlog)
    
  } catch (exception){
    
      next(exception)
  }   
   
})

module.exports = blogsRouter