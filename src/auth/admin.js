import createHttpError from "http-errors"

export const adminOnly = (req, res, next) => {
    if(req.user.role === "Admin"){
        next()
    }else{
        next(createHttpError(403, 'Admin only'))
    }
}