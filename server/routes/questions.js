const express = require('express');
const router = express.Router();
const validateToken = require('../auth/validateToken');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Post = require('../models/Posts');
const Comment = require('../models/Comments');
const User = require('../models/Users');


router.get('/', async (req, res, next) => {


  // qTitle = { question.title }
  // id = { question.id }
  // author = { question.author }
  // timestamp = { question.timestamp }

  try {
    // const posts = await Post.find({}).then((posts, err) => {
    //   if (err) return res.json({ err: true });
    //   const titles = [];

    //   posts.forEach((post) => {
    //     titles.push({
    //       qTitle: post.title,
    //       id: post._id,
    //       comments: post.comments,
    //       // author: new Promise((resolve) => {
    //       //   User.findOne({ _id: post.user }).then((user) => {
    //       //     resolve(user)
    //       //   })
    //       // }),
    //       votes: post.votes,
    //       timestamp: post.createdAt
    //     })
    //   });

    //   return Promise.all(posts);

    // }).then((posts) => {
    //   console.log(posts)
    // })

    const posts = await Post.find({}).populate('user').then((posts, err) => {
      if(err) return { err: true }
      const titles = [];
      posts.forEach((post) => {
        titles.push({
          qTitle: post.title,
          id: post._id,
          comments: post.comments,
          author: post.user.displayName,
          authorId: post.user._id,
          votes: post.votes,
          timestamp: post.createdAt
        })
      });
      return titles;
    })
    console.log(posts)
    res.json(posts)

  } catch (error) {
    throw error;
  }
});

// TODO validate token before posting

router.post('/ask', validateToken, async (req, res, next) => {

  try {
    const _id = new mongoose.Types.ObjectId(req.user._id);
    const post = await Post.create({ user: _id, title: req.body.title.title, content: req.body.content });
  } catch (error) {

  }
});

router.get('/:id', async (req, res, next) => {

  try {
    const post = await Post.findOne({ _id: req.params.id })
    res.json(post);
  } catch (error) {
    throw error;
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const _idPost = new mongoose.Types.ObjectId(req.params.id);
    const comments = await Comment.find({ postId: _idPost });
    res.json(comments);
  } catch (error) {
    throw error;
  }
});

router.post('/:id/comments', validateToken, async (req, res, next) => {

  try {
    const _idUser = new mongoose.Types.ObjectId(req.user._id);
    const _idPost = new mongoose.Types.ObjectId(req.body.postID);
    const post = await Post.findOneAndUpdate({ _id: _idPost }, { $inc: { 'comments': 1 } });
    const comment = await Comment.create({ user: _idUser, postId: _idPost, content: req.body.content });
  } catch (error) {
    throw error;
  }
});


module.exports = router;
