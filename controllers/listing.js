require('dotenv').config();
const Listing=require("../models/listing")
const ExpressError =require("../utils/ExpressError.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken= process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.indexRoute=async (req,res)=>{
    let allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}
module.exports.getListing=(req,res)=>{
    res.render("listings/new.ejs");
}
module.exports.createNewListing=async (req,res)=>{
    //let {title,description,image,price,location,country}=req.body;
    //let listing=req.body.listing;
    //console.log(listing);
    //     throw new ExpressError(400,"Send valid data for listing"); 
    // }

    let result=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 2
      })
        .send()
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(req.body)
    let newList= new Listing(req.body.listing); 
    newList.image={url,filename}
    newList.owner=req.user._id;
    newList.geometry=result.body.features[0].geometry
    await newList.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner"); 
    if(!listing){
     req.flash("error","Listing you are requesting is not Existed !");
     res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
}
module.exports.renderEditForm=async (req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id); 
    if(!listing){
     throw new ExpressError(400,"Invalid ID"); 
    }
    let originalUrl=listing.image.url;
    originalUrl=originalUrl.replace("/upload","/upload/w_250")
    console.log(originalUrl)
    res.render("listings/edit.ejs",{listing,originalUrl});
}
module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    // if(!req.body.listing){
    //     throw new ExpressError(400,"Send valid data for listing"); 
    // }
    let listing= await Listing.findById(id).populate("reviews"); 
    if(!listing){
        req.flash("error","Listing you are requesting is not Existed !");
        return res.redirect("/listings");
    }
    let listing1=await Listing.findByIdAndUpdate(id,{...req.body.listing}); 
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing1.image={url,filename}
        await listing1.save();
    }
    req.flash("success","Updated Listing!");
    res.redirect(`/listings/${id}`);
}
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id); 
    req.flash("success","Deleted Listing !");
    res.redirect(`/listings`);
}

module.exports.getCategory=async (req,res)=>{
    let name=req.params.name;
    let allListings= await Listing.find({category:`${name}`});
    res.render("listings/index.ejs",{allListings});
}