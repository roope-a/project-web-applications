const express = require('express');
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage })
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');


router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await User.findOne({ _id: req.params.id })
    res.json(post);
  } catch(error) {
    throw error;
  }
});

router.post('/register',
  upload.fields([
    {
      name: 'displayName',
      maxCount: 1
    },
    {
      name: 'email',
      maxCount: 1
    },
    {
      name: 'password',
      maxCount: 1
    }
  ]),
  body('displayName').notEmpty(),

  body('email').isEmail().notEmpty(),

  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0
  }),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ error: errors.array() });
    };

    passport.authenticate('signup', { session: false }, (err, user, info) => {

      if (err) throw (err);
      if (!user) { return res.status(403).json({ error: 'Email already in use' }) };

      return res.status(200).json({ success: true });

    })(req, res, next);
  });

router.post('/login',
  upload.fields([
    {
      name: 'email',
      maxCount: 1
    },
    {
      name: 'password',
      maxCount: 1
    }
  ]),

  body('email').isEmail().notEmpty(),

  async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(403).json({ error: errors.array() });
        };

        if (err || !user) {
          return res.status(403).json({ error: [{ param: 'both' }]})
        };
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign(body, process.env.SECRET);
          return res.json({ success: true, token: token });
        },
        );
      } catch (error) {
        return next(error);
      };
    }
    )(req, res, next);
  });

module.exports = router;
