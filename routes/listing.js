const express= require("express");
const router = express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const wrapAsync =require("../utils/wrapAsync.js");
const ExpressError =require("../utils/ExpressError.js");
const {isLoggedin,isOwner,validateListing}= require("../middleware.js");
const { indexRoute, getListing, createNewListing, showListing, renderEditForm, editListing, deleteListing,getCategory } = require("../controllers/listing.js");
const multer=require("multer");
const {storage}= require("../configCloud.js")
const upload=multer({storage});


 router.route("/").get(wrapAsync(indexRoute)).post(isLoggedin,upload.single("listing[image]"),validateListing,wrapAsync(createNewListing));

router.get("/new",isLoggedin,getListing)
router.get("/category/:name",wrapAsync(getCategory))

router.route("/:id").get(wrapAsync(showListing)).put(isLoggedin,isOwner,upload.single("listing[image]"),wrapAsync(editListing)).delete(isLoggedin,isOwner,wrapAsync(deleteListing))

router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(renderEditForm))

module.exports=router;