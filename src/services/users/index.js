import express from 'express'
import UserModel from  './schema.js'

import { adminOnly } from '../../auth/admin.js'
import { JWTAuthenticate } from '../../auth/tools.js'
import createHttpError from 'http-errors'
import { JWTAuthMiddleware } from '../../auth/token.js'

const usersRouter = express.Router()

usersRouter.post('/register', async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.save()
        res.send(_id)

    } catch (error) {
        next(error)
    }
})


// localhost:3003/users/me
usersRouter.get('/', JWTAuthMiddleware, async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        next(error)
    }
})
//userId
usersRouter.get('/me',  JWTAuthMiddleware,  async (req, res, next) => {
  
    try {
        console.log('`Route get ME')
        res.send(req.user)
    } catch (error) {
        next(error)
    }
})

usersRouter.put('/me',  JWTAuthMiddleware, async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})

usersRouter.delete('/me',  JWTAuthMiddleware, async (req, res, next) => {
    try {
        await req.user.deleteOne()
    } catch (error) {
        next(error)
    }
})


usersRouter.get('/:userId', JWTAuthMiddleware, adminOnly , async (req, res, next)=>{

    try {
    const user = await UserModel.findById(req.params.userId)
    res.send(user)
} catch (error) {
    next(error)
}

})


usersRouter.post('/login', async (req, res, next)=>{
    try {
        const {email, password} = req.body

        //1. verify credentials
        const user = await UserModel.checkCredentials(email, password)
        if (user){
            const accessToken = await JWTAuthenticate(user)
            res.send(accessToken)
        }else {
            next(createHttpError(401, 'Credentials are not ok'))
        }

        //2. create JWT

    } catch (error) {
        next(error)
    }
})

export default usersRouter