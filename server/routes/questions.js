const express = require('express');
const router = express.Router();
const validateToken = require('../auth/validateToken');
const mongoose = require('mongoose');

const Post = require('../models/Posts');
const User = require('../models/Users');

router.get('/', (req, res, next) => {
  res.send('respond with questions');
});

// TODO validate token before posting

router.post('/ask', validateToken, async (req, res, next) => {

  // const items = req.body.items;

  // console.log('were here first');
  console.log(req.body.title);
  // console.log(req.user._id);

  // find user by ????

  const _id = new mongoose.Types.ObjectId(req.user._id);
  
  // console.log(User.find({'_id': _id}))

  // req.user._id

  // save the post
  
  const post = await Post.create({user: _id, title: req.body.title, content: req.body.content});

  console.log(post)

    res.send('respond with ask page');
  });


module.exports = router;
