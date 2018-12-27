var express = require('express');
var router = express.Router();

var passport = require('passport');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',function(req, res) { res.redirect('http://localhost:4200');});

//
// var isAuthenticated = function (req, res, next) {
//     // if user is authenticated in the session, call the next() to call the next request handler
//     // Passport adds this method to request object. A middleware is allowed to add properties to
//     // request and response objects
//     if (req.isAuthenticated())
//         return next();
//     // if the user is not authenticated then redirect him to the login page
//     res.redirect('/login');
// }



/* GET login page. */
router.get('/login', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message') });
});

router.post('/loginpost', function(req, res, next) {
            console.log('Inside POST /login callback')
            passport.authenticate('local', function (err, user, info){

                console.log('Inside passport.authenticate() callback');

                if (user == false)
                {
                    console.log('Login Failed');
                    res.send({id:-1,message:'Invalid Credentials'});
                } else {
                    console.log('Login passed');
                    console.log('req.session.passport: ${}'+JSON.stringify(req.session.passport));
                    console.log('req.user: ${}'+JSON.stringify(req.user));

                    req.login(user, function(err) {
                        console.log('Inside req.login() callback')
                        console.log('req.session.passport: ${JSON.stringify(req.session.passport)}')
                        console.log('req.user: ${JSON.stringify(req.user)}')
                        console.dir(user);
                        res.send(user);

                    })

                }


        })(req, res, next);
})


/* GET Home Page */
router.get('/home',  function(req, res){
    res.render('home', { user: req.user });
});

/* Handle Logout */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/inside', function(req, res, next) {
    console.log('inside route');
    console.log('Inside GET /authrequired callback');
    console.log('User authenticated? ${}'+req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log('authjenticated');
        res.render('index', { title: 'Inside Express' });
    } else {
        console.log('not authjenticated');
        res.redirect('/')
    }




});

router.get('/user', function(req, res) {
    console.log('Getting current user');
    console.log(req.sessionID);
    console.log('User authenticated? ${}'+req.isAuthenticated());
    if(req.isAuthenticated()) {
        console.log(' authenticated');
        res.send(req.user);

    } else {
        console.log('not authenticated');
        var user = {id:-1};
        res.send(user);
    }




});

module.exports = router;
