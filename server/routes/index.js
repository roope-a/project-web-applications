const express = require('express');
const router = express.Router();
const validateToken = require('../auth/validateToken');

router.get('/validate', validateToken, (req, res, next) => {
  res.json({ success: true })
});

module.exports = router;
