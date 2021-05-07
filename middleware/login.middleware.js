const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const IsLoggedInMiddleware = () => {
    return async (req, res, next) => {
        var cookie = JSON.parse(JSON.stringify(req.cookies));
        if (cookie['isloggedin'] === undefined) {
            res.send('Not logged in.');
        } else {
            let token = req.cookies['isloggedin'];
            if (!token) res.status(401).json('Not Logged In');
            try {
                let decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (!decoded)
                    return res.status(401).json('Expired or Invalid token');
                let user = await User.findOne({ username: decoded.username });
                if (!user)
                {
                    res.send('User doesnt exist');
                }
                else if(user.verified===false)
                {
                    res.send('Not Verified. Verify First');
                }
                else{
                    req.body.email = user.email;
                    req.body.name = user.name;
                    req.body.verified=user.verified;
                    req.body.phone=user.phone;
                    req.body.username = user.username;
                    next();
                }
            } catch (error) {
                return res.status(500).send(error);
            }
        }
    };
};

module.exports = IsLoggedInMiddleware;
