
import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken'

const isLoggedIn = async (req, res, next) =>{
    const {token} = req.cookies;

    if(!token){
        return next (new AppError('Unauthenticated, please login again',401))

    }

    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetails;
    next();

    
}


const auththorizeSubscriber = async(req, res, next)=>{
    const subscribe = req.user.subscription;
    const currentUserRoles = req.user.role;
    if(currentUserRoles !== 'ADMIN' && subscription.status !== 'active'){
        return next (
            new AppError('please subscribe to access this rout', 403)
        )
    }

}


const authorizedRoles = (...roles) => async(req, res, next) =>{
    const currentUserRoles = req.user.roles;

    if(!roles.incudes(currentUserRoles)){
        return next 
        (new AppError('You do not have permission to access this route',403))

        
    }


}
export{
    isLoggedIn,
    authorizedRoles,
    auththorizeSubscriber
}