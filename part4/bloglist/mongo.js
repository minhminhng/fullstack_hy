require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.TEST_MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0
})

blog.save().then(() => {
  console.log('A new blog is saved!')
  mongoose.connection.close()
})

// Blog.find({}).then(result => {
//   result.forEach(blog => {
//     console.log(blog)
//   })
//   mongoose.connection.close()
// })