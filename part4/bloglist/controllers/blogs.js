const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})  
    response.json(blogs)
})
  

blogsRouter.post('/', async(request, response, next) => {
    const blog = new Blog(request.body)
    try {
      const savedBlog = await blog.save()
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
    console.log(blog)
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
    console.log(updatedBlog)
  } catch (exception){
      console.log(exception)
      next(exception)
  }   
   
})

module.exports = blogsRouter