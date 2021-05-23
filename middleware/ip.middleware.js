const RequestIp = require('@supercharge/request-ip')

const getIpMiddleware = function (req, res, next) {  
  req.ip = RequestIp.getClientIp(req)
  next();
}

module.exports=getIpMiddleware;