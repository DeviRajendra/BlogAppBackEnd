const logger = require('pino')()
const moment = require('moment')

let captureError = (errorMessage, errorOrigin, errorLevel)=>{
    let  currentTime = moment()

    let errorResponse = {
        timestamp : currentTime,
        errorMessage:errorMessage,
        errorOrigin:errorOrigin,
        errorLevel:errorLevel
    }
    
   logger.error(errorResponse)
    return errorResponse
}

let captureInfo = (message, origin ,level)=>{
    let currentTime = moment()

    let infoResponse = {
        timestamp: currentTime,
        origin:origin,
        message:message,
        level:level
    }
    logger.info(infoResponse)
    return infoResponse
}

module.exports = {
    error:captureError,
    success:captureInfo
}