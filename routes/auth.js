const express = require('express');

const router = express.Router();

const Account = require('../models/account');

/* GET users listing. */
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let account = null;
  try {
    account = await Account.findOne({ username });
  } catch (error) {
    console.log(error);
  }

  if (!account) {
    return res.render('login', { error: 'Username or password is incorrect!' });
  }

  if (account.password !== password) {
    return res.render('login', { error: 'Username or password is incorrect!' });
  }
  return res.redirect('/');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  let account = null;
  try {
    account = await Account.findOne({ username });
  } catch (error) {
    console.log(error);
  }

  if (!account) {
    return res.render('login', { error: 'Username or password is incorrect!' });
  }

  if (account.password !== password) {
    return res.render('login', { error: 'Username or password is incorrect!' });
  }
  return res.redirect('/');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/manager-user', function(req, res, next) {
  res.render('manager-user');
});

router.get('/place-detail', (req, res) => {
  res.render('place-detail');
});
module.exports = router;
