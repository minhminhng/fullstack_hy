const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')



const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)


const PORT = 3003
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})