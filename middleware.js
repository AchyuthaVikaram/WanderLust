const Listing= require("./models/listing.js");
const Review=require("./models/review.js")
const ExpressError =require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
module.exports.isLoggedin= (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must Logged in to create Listing!!");
        res.redirect("/login");
    }else{
        next()
    }
};

module.exports.saveRedirectUrl =(req,res,next)=>{
   if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl
   }
   next();
}

module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to this Listing!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing=(req,res,next)=>{
    let result= listingSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    }else{
        next();
    }
}
module.exports.validateReview=(req,res,next)=>{
    let result=reviewSchema.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error);
    }else{
        next();
    }
}

module.exports.isAuthor=async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to this review!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}