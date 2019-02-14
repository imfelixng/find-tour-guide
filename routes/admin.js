var express = require('express');
var router = express.Router();
var multer  = require('multer')

const Location = require('../models/location');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, new Date().getTime() + "_" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  //check kieu file gui len
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      cb(new Error("Error mime type of file"), false);
  }
}

const upload = multer({
  storage,
  limits: 1024 * 1024 * 5, //check kich thuoc fiel gui len
  fileFilter
});

router.get('/add-location', function(req, res, next) {
  res.render('add-location');
});

router.post('/add-location', async function(req, res, next) {
  const { location_name, address, intro, picture } = req.body;
  
  let location = new Location({
    name: location_name,
    address,
    intro,
    picture
  });

  let locationCreated = null;
  try {
    locationCreated = await location.save();
  } catch (error) {
    console.log(error);
  }

  if (!location) {
    console.log("Don't created");
  }

  res.redirect("/admin/manage-location");
});

router.get('/manage-location', function(req, res, next) {
  res.send('OK');
});

module.exports = router;