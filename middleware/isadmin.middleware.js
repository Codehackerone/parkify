const IsAdminMiddleware = () => {
    return async (req, res, next) => {
        try
        {
            if(req.body.user_type!=="admin")
            {
                res.send('Permission Denied');
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
