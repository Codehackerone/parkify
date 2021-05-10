const IsAdminMiddleware = () => {
    return async (req, res, next) => {
        try
        {
            if(req.body.user_type!=="admin")
            {
                req.flash('alert','Not Authorized. Not Allowed.');
                res.redirect('/users/dashboard');
            }
            else{
                next();
            }
        } 
        catch (error) {
                return res.status(500).send(error);
            }
    }
 };


module.exports = IsAdminMiddleware;
