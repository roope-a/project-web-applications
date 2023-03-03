const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-local').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {

        // try {
        //     const displayName = req.body.displayName;
        //     const registerDate = req.body.registerDate;

        //     await User.findOne({ email: email }, (err, user) => {
        //         if (user) {
        //             return done(null, false, { message: 'E-mail already in use!' });
        //         } else {
        //             const user = User.create({ displayName: displayName, email: email, password: password, registerDate: registerDate });
        //             return done(null, user);
        //         }
        //     });
        // } catch (error) {
        //     console.log(error);
        //     return done(error);
        // }

        try {
            const displayName = req.body.displayName;
            const registerDate = req.body.registerDate;
            let user = await User.findOne({ email: email });
            if (user) {
                return done(null, false);
              };
            user = await User.create({ displayName: displayName, email: email, password: password, registerDate: registerDate });
            return done(null, user);
          } catch (error) {
            console.log(error);
            return done(error);
          }
    }
)
);

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            console.log(email)
            console.log(password)

            const user = await User.findOne({ email: email });

            if (!user) {
                return done(null, false);
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false);
            };

            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    })
);


// passport.use('jwt', new JWTstrategy(
//     {
//       secret: 'TOP_SECRET_KEY',
//       id:
//       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );