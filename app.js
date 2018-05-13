var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var User = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
// socket server setup
var http = require("http");
var server = http.Server(app);
var io= require('socket.io')(server);


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

//set up jquery in node.js (i.e. serverside)
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

// a middleware for currentUser
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

// Home Page route
app.get("/", function(req,res){
    res.render("home");
})

// loggedin route
app.get("/loggedin",isLoggedIn, function(req, res){
    res.render("loggedin");
});

// chat app route
app.get("/livechat", isLoggedIn, function(req,res){
    res.render("chat");
});

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
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

server.listen(process.env.PORT, process.env.IP, function(){
  var addr = server.address();
  console.log("Chat server running at", addr.address + ":" + addr.port);
});

app.listen(3000, process.env.IP, function(){
   console.log("App server running at", process.env.IP + ":" + 3000);
});