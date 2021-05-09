const IsAdminMiddleware = () => {
    return async (req, res, next) => {
        try
        {
            if(req.user.type!=="Admin")
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
