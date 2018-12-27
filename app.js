var createError = require('http-errors');
var express = require('express');

const uuid = require('uuid/v4');


const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var path = require('path');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var scmRouter = require('./routes/scm');

var myDsConfig = require("./routes/dsconfig");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));



app.use(express.static(path.join(__dirname, 'public')));


function dsSearch( myArray,key,val){
    for (var i=0; i < myArray.length; i++) {
        if (typeof (myArray[i][key]) !== 'undefined' && myArray[i][key] === val) {
            return myArray[i];
        }
    }
    return -1;
}

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    },
    function( email, password, done) {

        console.log('username is '+email  );
        console.log('password is ' +password);


        email = email.toLowerCase();

        // find in array
        var myUser = dsSearch(myDsConfig.USERS,'email',email);


        if (myUser !== -1 && myUser.password == password)
        {
            console.log('User found in Local DB')

            var user = Object.assign({}, myUser);
            delete user.password;
            return done(null, user);
        }

        console.log('Local strategy returned false')
        return done(null, false);


    }
));

// tell passport how to serialize the user
passport.serializeUser(function(user, done) {
    console.log('dronasys serializer called');
    console.dir(user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('dronasys DEserializer called');
    console.log('The user id passport saved in the session file store is: ${}'+id)

    // find in array
    var myUser = dsSearch(myDsConfig.USERS,'id',id);


    if (myUser == -1) {
        done(null, false);
    }
    else
    {
        var user = Object.assign({}, myUser);
        delete user.password;
        console.log('padding user on deserialize');
        console.dir(user);
        done(null, user);
    }
});


var session = require('express-session');
const FileStore = require('session-file-store')(session);
app.use(session({
    secret: "dronasys",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: FileStore(),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());



// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', myDsConfig.CLIENTDOMAIN);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.get('/',function(req, res) { res.redirect('http://localhost:4222');});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/scm', scmRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(3000, function() {console.log('Example app listening on port 3000!');});

module.exports = app;
