const moment = require('moment');
const momenttz = require('moment-timezone');

const timeZone = 'Asia/Calcutta'

let now = ()=>{
    return moment.utc().format()
}

let getLocalTime = (timezone)=>{
    return moment().tz(timezone).format()
}

let converToLocalTime =(time)=>{
    return momenttz.tz(time,timeZone).format('MMMM Do YYYY, h:mm:ss a')
}

module.exports={
    now:now,
    convertToLocalTime:converToLocalTime,
    getLocalTime:getLocalTime
}