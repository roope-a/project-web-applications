const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.send('respond with questions');
});

router.get('/ask', function(req, res, next) {
    res.send('respond with ask page');
  });


module.exports = router;
