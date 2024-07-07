require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const session = require("express-session");
const mongoStore=require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const dbUrl=process.env.ATLAS_URL;

const store=mongoStore.create({
   mongoUrl:dbUrl,
   crypto:{
    secret:process.env.SECRET_CODE
   },
   touchAfter:7*24*3600
})

const sessionOptions = {
  store:store,
  secret: process.env.SECRET_CODE,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
};

app.set("view engine", "ejs"); // Fixed typo here
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

main().then(() => {
  console.log("Creation was successful");
}).catch(err => {
  console.log("Error", err);
});
async function main() {
  await mongoose.connect(dbUrl);
}

// Root route
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// User routes
app.use("/", userRouter);

// Listing routes
app.use("/listings", listingRouter);

// Review routes
app.use("/listings/:id/reviews", reviewRouter);

// Throwing error for non-existing route
// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

app.get("/privacy",(req,res)=>{
  res.render("privacy.ejs");
})
app.get("/terms",(req,res)=>{
  res.render("terms.ejs");
})
// Error handler
app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Some error has occurred" } = err;
  res.status(status).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("App is listening on port 8080");
});


