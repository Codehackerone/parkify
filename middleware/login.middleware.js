const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/* ------------ Authentication Middleware ----------- */

// IsloggedInMiddleware ... validates the user from jwt token stored in cookies
const IsLoggedInMiddleware = () => {
    return async (req, res, next) => {
        // Access token from cookies
        var cookie = JSON.parse(JSON.stringify(req.cookies));

        // Token not found
        if (cookie['isloggedin'] === undefined) {
            req.flash('err', 'Not Logged in. Please login to continue');
            res.redirect('/users/login');
        } else {
            let token = req.cookies['isloggedin'];
            if (!token) {
                req.flash('alert', 'Not Logged in. Please login to continue');
                res.redirect('/users/login');
            }
            try {
                // Unsign and verify the jwt token
                let decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (!decoded)
                    return res.status(401).json('Expired or Invalid token');

                // Fetch user from DB
                let user = await User.findOne({ username: decoded.username });

                // If user not found
                if (!user) {
                    req.flash('err', 'User Doesnt Exist');
                    res.redirect('/');
                }
                // Check for user authenticity
                else if (
                    user.verified === false &&
                    req.url != '/verify' &&
                    req.url != '/resendotp'
                ) {
                    req.flash('alert', 'Not Verified.');
                    res.redirect('/users/verify');
                } else {
                    // Add user properties to the request body
                    req.body.user_id = user._id;
                    req.body.email = user.email;
                    req.body.name = user.name;
                    req.body.verified = user.verified;
                    req.body.phone = user.phone;
                    req.body.username = user.username;
                    req.body.picture_url = user.picture_url;
                    req.body.money = user.money;
                    req.body.user_type = user.type;

                    // Call next middleware on successful validation
                    next();
                }
            } catch (error) {
                return res.status(500).send(error);
            }
        }
    };
};

module.exports = IsLoggedInMiddleware;
