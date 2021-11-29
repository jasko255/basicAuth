import createHttpError from "http-errors"
import { verifyJWT } from "./tools.js"
import UserModel from '../services/users/index.js'

export const JWTAuthMiddleware = async (req, res, next) => {
    //1. check if auth header is received, if not > error 401
    if(!req.headers.authorization) {
        next(createHttpError(401, 'Please provide credentials in authorization header'))
    } else{
        //2. extract the token from auth header
        try {
            const token = req.headers.authorization.replace('Bearer ', '')
            //3. verify token
            const decodedToken = await verifyJWT(token)
            console.log(decodedToken);
            //4. find the user in db by id and attacg him to req.user

            const user = await UserModel.findById(decodedToken._id)

            if (user){
                req.user = user
                next()

            }else {
                next(createHttpError(404, 'User not found'))
            }
            

    } catch (error) {

        next(createHttpError(401, 'token not valid'))
    }
}





}