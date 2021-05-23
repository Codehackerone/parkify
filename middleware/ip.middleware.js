const RequestIp = require('@supercharge/request-ip')

const getIpMiddleware = function (req, res, next) {  
  if(RequestIp.getClientIp(req)!=="::1")req.ipv2 = RequestIp.getClientIp(req);
  next();
}

module.exports=getIpMiddleware;