const express = require('express');

const router = express.Router();

const Account = require('../models/account');
const TourGuide = require('../models/tourguide');

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
    return res.render('add-location', { error: 'An error has occurred, please try again in a few minutes.' });
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
    return res.render('add-location', { error: 'An error has occurred, please try again in a few minutes.' });
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

router.post('/register', async function (req, res, next) {
  console.log(req.body);
  const {username, password, confirmPassword, fullname, gender, wantTourGuide, email, address} = req.body;
  let account = null;

  try{
    account = await Account.findOne({username});
  }catch(error){
    console.log(error);
  }

  if(account){
    return res.render('register', {error: "username is exist!"});
  }
  if(password != confirmPassword || password.length < 6){
    return res.render('register', {error: "Wrong password"});
  }
  let role = 0;
  if(!wantTourGuide){
    role = 1;
  }
  else{
    role = 2;
  }
  let gt = true;
  if(gender == "female"){
    gt = true;
  }
  let user = new Account({
    username, 
    password,
    fullname,
    gt,
    role
  });

  user.save().then().catch(err => {
    res.status(400).send("unable to save data");
  });

  if(role == 2){
    let tourGuide = new TourGuide({
      email, 
      address
    });

    tourGuide.save().then().catch(err => {
      res.status(400).send("unable to save data");
    });
  }

  return res.redirect('/login');
});

router.get('/manager-user', (req, res) => {
  res.render('manager-user');
});

router.get('/place-detail', (req, res) => {
  res.render('place-detail');
});
module.exports = router;
