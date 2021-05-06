const jwt = require('jsonwebtoken');

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
                next();
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    };
};

module.exports = IsLoggedInMiddleware;
