const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response) =>{
    const body = request.body

    if (body.username.length < 3) {
        return response.status(400).json({
        error: 'username must include at least 3 characters'
      })
    }

    if (body.password.length < 3) {
        return response.status(400).json({
        error: 'password must include at least 3 characters'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    
    const savedUser = await user.save()
    response.json(savedUser)
    // try and catch works if not express-async-error is not installed
    // try {
    // } catch(exception) {  
    //     console.log(exception) 
    //     next(exception)  
    //     return response.status(400).json({ error: exception.message })
        
    // }
})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, url: 1, likes: 1})
    response.json(users)
})

module.exports = usersRouter


