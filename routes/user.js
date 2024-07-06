const express= require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router({mergeParams:true});
const User=require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { renderSignup, login, renderLoginForm, logout, signup } = require("../controllers/user.js");

router.route("/signup").get(renderSignup).post(wrapAsync(signup));

router.route("/login").get(renderLoginForm).post(saveRedirectUrl,passport.authenticate("local",{failureRedirect: '/login' , failureFlash:true}),login);
router.get("/logout",logout)

module.exports=router;