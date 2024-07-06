const User=require("../models/user")
module.exports.renderSignup=(req,res)=>{
    res.render("user/signupform.ejs");
}
module.exports.signup=async(req,res,next)=>{
    try{
        let {username,email,password}=req.body;
        let newUser= new User({username,email});
        let registerdeUser=await User.register(newUser,password);
        req.login(registerdeUser,(err)=>{
            if(err){
                next(err);
            }else{
                req.flash("success","Welcome to WanderLust");
                res.redirect("/listings");
            }
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.login=async (req,res)=>{
    req.flash("success",`Welcome back to WanderLust! @${req.body.username}`);
    let redirectUrl= res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("user/loginform.ejs");
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err)
            return next(err)
        req.flash("success","You have loggedOut!")
        res.redirect("/listings");
    })
}