const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body
    try{
        if (request.body.password.length < 3 || !request.body.password) {
            return response.status(400).json({ error: 'Password should be at least three (3) characters long' })
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
    
        const user = new User({
            username,
            name,
            passwordHash,
        })
    
        const savedUser = await user.save()
    
        response.status(201).json(savedUser)
    }catch (exception) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
        }
    
 
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blog', { title: 1, author: 1, url: 1, likes: 1  }) 
    response.json(users)
})

module.exports = usersRouter