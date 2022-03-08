var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var User = mongoose.model('users');

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, function(email, password, done){
        console.log(email);
        console.log(password);
        User.findOne({email: email}).then(function(user){
            console.log(user)
            if(!user){
                return done(null, false, {messsage: "No user found"})
            }

            bcrypt.compare(password, user.password, function(err, isMatch){
                if(err)throw err;

                if(isMatch){
                    return done(null, user)
                }else{
                    return done(null, false, {message: "Password Incorrect"})
                }
            })
        })
    }))

    passport.serializeUser(function(user, done){
        console.log('-----')
        console.log(user)
        done(null, user.id);

    })

    passport.deserializeUser(function(id,done){
        console.log(id);
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
}
