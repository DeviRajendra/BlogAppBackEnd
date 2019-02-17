const express = require('express')
const logger = require('./../lib/loggerLib')
const response = require('./../lib/responseLib')

isAuthenticated = (req,res,next)=>{
    if(req.params.authToken || req.query.authToken || req.header('authToken')){
        if(req.params.authToken === 'admin' || req.query.authToken==='admin' || req.header('authToken')==='admin'){
            req.user ={'fullName':'Rajendra','lastName':'Varma'}
            next()
        }
        else{
            logger.error('Incorrect Authentication','Authentication Middleware', 10)
            let apiResponse = response.generate(true, 'Incorrect Authentication provided', 500,null)
            res.send(apiResponse)
        }
    }else{
        logger.error('No authentication provided','authentication Middleware',20)
        let apiResponse = response.generate(true,"No authentication provided",500,null)
        res.send(apiResponse)
    }
}

module.exports={
    isAuthenticated:isAuthenticated
}