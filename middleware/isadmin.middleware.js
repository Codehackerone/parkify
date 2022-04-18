// IsAdminMiddleware... is a middleware that checks if the user is an admin
const IsAdminMiddleware = () => {
    return async (req, res, next) => {
        try {
            // Checks if the user is an admin
            if (req.body.user_type !== 'admin') {
                req.flash('alert', 'Not Authorized. Not Allowed.');
                res.redirect('/users/dashboard');
            } else {
                next();
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    };
};

module.exports = IsAdminMiddleware;
