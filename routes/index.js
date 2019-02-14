var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Find tour guide' });
});
// GET Register form
router.get('/register', function(req, res, next){
  res.render('register', {title: 'Register'});
});

module.exports = router;
