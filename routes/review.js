const express= require("express");
const router = express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review=require("../models/review.js")
const wrapAsync =require("../utils/wrapAsync.js");
const {validateReview, isLoggedin, isAuthor}=require("../middleware.js");
const { creatReview, deleteReview } = require("../controllers/review.js");

// reviews
//post  review route
router.post("/",isLoggedin,validateReview,wrapAsync(creatReview))
//delete review route
router.route("/:reviewId").delete(isLoggedin,isAuthor,wrapAsync(deleteReview))

module.exports=router;
