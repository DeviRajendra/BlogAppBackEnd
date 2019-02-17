let exampleMiddleware = (req,res,next)=>{
    req.user= {'firstName':'Rajendra','lastName':'Varma'}
    next();
}

module.exports={
    exampleMiddleware:exampleMiddleware
}