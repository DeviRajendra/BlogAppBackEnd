const appConfig = require('./../config/appConfig')
const time = require('./../lib/timeLib')

let requestIpLogger = (req,res,next)=>{
    let remoteIp = req.connection.remoteAddress +'://'+req.connection.remotePort;
    let gTime = time.now()
    let localTime = time.convertToLocalTime(gTime)
    console.log(req.method + ' made from '+ remoteIp + ' for route '+req.originalUrl + " at " +localTime)

    if(req.method==='OPTIONS'){
        console.log('!OPTIONS');
        headers["Access-Control-Allow-Origin"]='*';
        headers["Access-Control-Allow-Methods"]='GET,POST,PUT,DElETE,OPTIONS';
        headers["Access-Control-Allow-Credentials"]=false;
        headers['Access-Control-Max-Age']=86400;
        headers["Access-Control-Allow-Headers"]='X-Requested-With, X-Http-Method-Override, Content-Type,Accept';
        res.writeHead(200,headers);
        res.end()
    }else{
        res.header("Access-Control-Allow-Origin", appConfig.allowedCorsOrigin);
        res.header("Access-Control-Allow-Methods",'GET,POST,PUT,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept");
        next();
    }
}

module.exports = {
    logIp:requestIpLogger
}


