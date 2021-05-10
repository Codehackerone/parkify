const userService = require('../services/user.service');
const bookingService=require('../services/booking.service');
const jwt = require('jsonwebtoken');

let options = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 60 * Number(process.env.EXPIRY), 
    httpOnly: true, 
};

let options_otp = {
    path: '/',
    sameSite: true,
    maxAge: 1000 * 60 * 5, 
    httpOnly: true, 
};
const renderRegister = (req, res) => {
    res.render('users/register');
};
const renderLogin = (req, res) => {
    res.render('users/login');
};
const renderDashboard=async(req,res)=>
{
    var bookings=await bookingService.FindByUser(req.body.user_id);
    res.render('users/dashboard', {body: req.body,bookings:bookings});
}
const renderAddMoney=(req,res)=>
{
    res.render('users/addmoney',{money:req.body.money});
}
const renderVerify=async(req,res)=>
{
    if(req.body.verified===true)
    {
        res.send('Already Verified');
    }
    else
    {
        var result=await sendOtp(req.body.username);
        res.cookie('otp', result.token, options_otp);
        res.render('users/verify',{email:req.body.email});
    }
}
const register=async (req,res)=>
{
    try {
        const result = await userService.Register(req.body);
        res.cookie('isloggedin', result.token, options);
        req.flash('alert','Registered Successfully. Please Verify your Email.');
        res.redirect('/users/verify');
    } catch (err) {
        req.flash('err','Error :'+err);
        res.redirect('/users/register');
    }
}

const sendOtp=async(username)=>
{
    try{
        var gen_otp=await userService.generateOtp(username);
        return gen_otp;
    }
    catch(err)
    {
        return(err);
    }
}

const login = async (req, res) => {
    try {
        const result = await userService.Login(
            req.body.username,
            req.body.password
        );
        req.flash('success','Logged in Successfully.');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err','Error :'+err);
        res.redirect('/users/login');
    }
};

const logout = (req, res) => {
    res.clearCookie('isloggedin');
    req.flash('success','Logged out Successfully.');
    res.redirect('/');
};

const verify=async(req,res)=>
{
    var otp=req.body.otp;
    let token = req.cookies['otp'];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
        return res.json('Expired or Invalid login token');
    else
    {
        if(decoded.otp===otp){
            await userService.verified(req.body.username);
            res.clearCookie('otp');
            res.send('Verified')
        }
        else
        {
            res.send('reenter otp');
        }
    }
}

const renderImage = (req, res) => {
    res.render('users/uploadimage');
};

const uploadImage = async (req, res) => {
    var path = req.file['path'];
    var userid = req.body.user_id;
    console.log(path+" "+userid);
    try {
        await userService.updateImage(userid, path);
        req.flash('success','Image Uploaded Successfully');
        res.redirect('/users/dashboard');
    } catch (err) {
        req.flash('err','Error :'+err);
        res.redirect('/users/changeimage');
    }
};

const addMoney=async (req,res)=>
{
    var add_money=req.body.added_money;
    try{
        await userService.addMoney(req.body.user_id,add_money);
        req.flash('success','Money Added Successfully');
        res.redirect('/users/dashboard');
    }
    catch(err)
    {
        req.flash('err','Error :'+err);
        res.redirect('/users/addmoney');
    }
}

const apiOtp=(str)=>
{
    let token = req.cookies['otp'];
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.otp===str)return true;
    else return false;
}
module.exports={
renderLogin,
renderRegister,
register,
login,
renderDashboard,
logout,
renderVerify,
verify,
renderImage,
uploadImage,
renderAddMoney,
addMoney,
apiOtp
};