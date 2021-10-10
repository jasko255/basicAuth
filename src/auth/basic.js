import createHttpError from "http-errors"
import atob from 'atob'
import UserModel from '../services/users/schema.js'

export const basicAuthMiddleware =  async( req, res, next) => {
    

        console.log('BASIC AUTH MIDDLEWARE')
        console.log(req.headers)

        if (!req.headers.authorization){
            next(createHttpError(401, 'Please provide credentials in authorization headers'))
        }else{
            const decodedCredentials =  atob(req.headers.authorization.split(" ")[1])
            const [email, password] = decodedCredentials.split(':')
            console.log('email', email)
            console.log('password', password);

           const user = await UserModel.checkCredentials(email, password)
            
           if (user){

            req.user = user
               next()
           }else{
               next(createHttpError(401, 'Credentials not correct!'))
           }

        }


       
        
       

    
}