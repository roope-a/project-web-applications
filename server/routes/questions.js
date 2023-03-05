const express = require('express');
const router = express.Router();
const validateToken = require('../auth/validateToken');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Post = require('../models/Posts');
const Comment = require('../models/Comments');
const User = require('../models/Users');


router.get('/', async (req, res, next) => {
  try {
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
    if (post) {res.json({ success: true, id: post._id })}
  } catch (error) {

  }
});

router.get('/:id', async (req, res, next) => {

  try {
    const post = await Post.findOne({ _id: req.params.id }).populate('user').then((post, err) => {
      if(err) return { err: true }
      return ({
        _id: post._id,
        user: post.user.displayName,
        title: post.title,
        content: post.content,
        comments: post.comments,
        votes: post.votes,
        createdAt: post.createdAt
      })
    });
    res.json(post);
  } catch (error) {
    throw error;
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const _idPost = new mongoose.Types.ObjectId(req.params.id);
    const comments = await Comment.find({ postId: _idPost }).populate('user').then((posts, err) => {
      const comments = [];
      if(err) return { err: true }
      posts.forEach((post) => {
        comments.push({
          _id: post._id,
          user: post.user.displayName,
          userId: post.user._id,
          content: post.content,
          votes: post.votes,
          createdAt: post.date
        });
      });
      return comments;
    });
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
    if (comment) {res.json({ success: true })}
  } catch (error) {
    throw error;
  }
});


module.exports = router;
