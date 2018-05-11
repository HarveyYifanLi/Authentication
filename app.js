var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(require("express-session")({
    secret:"Bruce Lee is the best",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Home Page route
app.get("/", function(req,res){
    res.render("home");
})

// loggedin route
app.get("/loggedin",isLoggedIn, function(req, res){
    res.render("loggedin");
});

//register routes
app.get("/register", function(req,res){
    res.render("register");
})
app.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,dbres){
        if(err){
            console.log(err);
            res.render("register"); 
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/loggedin");
            })
        }
    })
})

//log in routes
app.get("/login", function(req,res){
    res.render("login");
})
app.post("/login", passport.authenticate("local",{
    successRedirect: "/loggedin",
    failureRedirect: "/login"
}), function(req, res){
})

// log out route
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started...");
})