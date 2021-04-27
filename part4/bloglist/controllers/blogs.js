const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
    if (!token || ! decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    

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

blogsRouter.delete('/:id', async(request, response) => {
    await Blog.findByIdAndRemove(request.params.id)      
    response.status(204).end()
})

blogsRouter.put('/:id', async(request, response, next) => {
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