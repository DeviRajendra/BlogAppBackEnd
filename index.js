// this is needed for importing expressjs into our application
const express = require('express')
const appConfig = require('./config/appConfig')
const fs = require('fs')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/appErrorHandler')
const routeLogger = require('./middlewares/routeLogger')
const http = require('http')
var helmet = require('helmet')
const logger = require('./lib/loggerLib')

//declaring an instance or creating an application instance
const app = express()

//middlewares
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(errorHandler.errorHandler);
app.use(routeLogger.logIp);




// Bootstrap models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log(file)
        require(modelsPath + '/' + file)
    }
  })
  // end Bootstrap models


// Bootstrap route
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if (~file.indexOf('.js')) {
        console.log("including the following file");
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

app.use(errorHandler.notFoundHandler)

//listening the server - creating a local server
const    server = http.createServer(app)
console.log(appConfig)
server.listen(appConfig.port)
server.on('error', onError)
server.on('listening', onListening)

function onError  (error){
    if(error.syscall!=='listen'){
        logger.error(error.code+'not equal listen', 'serverOnErrorHandler', 10)
    }

    switch(error.code){
        case 'EACCES':
            logger.error(error.code+': elevated privilidges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break
        case 'EADDRINUSE' :
        logger.error(error.code+': Address is already in use', 'serverOnErrorHandler', 10)
        process.exit(1)
        break

        default: 
        logger.error(error.code+': some unknwon error occurred', 'serverOnErrorHandler', 10)
        throw error
    }

}

function onListening (){
   var addr = server.address()
   var bind = typeof addr === 'string'
   ? 'pipe ' +addr
   : 'port' +addr.port;
   ('Listening on' +bind)
   logger.success('server listening on: '+addr.port, 'serverOnListeningHandler',10)
    let db = mongoose.connect(appConfig.db.uri,{useMongoClient:true})
}



// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);

    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler