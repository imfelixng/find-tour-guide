var express = require('express');
var router = express.Router();

const Account = require('../models/account');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login', { error: null});
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  let account = null;
  try {
    account = await Account.findOne({username});
  } catch (error) {
    console.log(error);
  }

  if(!account) {
    return res.render('login', { error : "Username or password is incorrect!"});
  }

  if (account.password !== password) {
    return res.render('login', { error : "Username or password is incorrect!"});
  }
  return res.redirect('/');
});

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;

  let account = null;
  try {
    account = await Account.findOne({username});
  } catch (error) {
    console.log(error);
  }

  if(!account) {
    return res.render('login', { error : "Username or password is incorrect!"});
  }

  if (account.password !== password) {
    return res.render('login', { error : "Username or password is incorrect!"});
  }
  return res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/managerUser', function(req, res, next) {
  res.render('managerUser');
});

router.get('/place-detail', function(req, res, next) {
  res.render('place-detail');
});
module.exports = router;
