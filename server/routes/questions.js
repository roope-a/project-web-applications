const express = require('express');
const router = express.Router();
const validateToken = require('../auth/validateToken');
const mongoose = require('mongoose');

const Post = require('../models/Posts');
const Comment = require('../models/Comments');
const User = require('../models/Users');

router.get('/', (req, res, next) => {
  res.send('respond with questions');
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

  console.log(req.params.id)
  try {
    const _idPost = new mongoose.Types.ObjectId(req.params.id);
    const comments = await Comment.find({ postId: _idPost })
    console.log(comments)
    res.json(comments);
  } catch (error) {
    throw error;
  }
});

router.post('/:id/comments', validateToken, async (req, res, next) => {

  try {
    const _idUser = new mongoose.Types.ObjectId(req.user._id);
    const _idPost = new mongoose.Types.ObjectId(req.body.postID);
    const comment = await Comment.create({ user: _idUser, postId: _idPost, content: req.body.content })
  } catch (error) {
    throw error;
  }
});


module.exports = router;
