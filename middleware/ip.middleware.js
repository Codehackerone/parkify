const RequestIp = require('@supercharge/request-ip');

// get the client's IP address
const getIpMiddleware = function (req, res, next) {
    if (RequestIp.getClientIp(req) !== '::1')
        req.ipv2 = RequestIp.getClientIp(req);
    next();
};

module.exports = getIpMiddleware;
