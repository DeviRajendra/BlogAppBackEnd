let errorHandler = (err,req,res,next)=>{
    console.log("application level error handler called")
    console.log(err)
    res.send("some error occurred at global")
}

let notFoundHandler = (req,res,next)=>{
    console.log("Global not found error called")
    res.status(404).send("Route not found in the application")
}


module.exports = {
    errorHandler:errorHandler,
    notFoundHandler:notFoundHandler
}