var express = require('express');
var router = express.Router();

const Account = require('../models/account');
const TourGuide = require('../models/tourguide');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
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

router.post('/register', async function (req, res, next) {
  console.log(req.body);
  const {username, password, password_conf, gender, wantTourGuide, email, address} = req.body;
  let account = null;

  try{
    account = await Account.findOne({username});
  }catch(error){
    console.log(error);
  }

  if(account){
    return res.render('register', {error: "username is exist!"})
  }
  if(!wantTourGuide){
    let user = new Account({
      username, 
      password,
      
    });


  }
  else{
    let tourGuide = new TourGuide({
      username, 
      password, 

    })
  }
    

    user.save().then().catch(err => {
      res.status(400).send("unable to save data");
    });
  return res.redirect('/');
})

module.exports = router;
