const express = require('express');
const multer = require('multer');

const router = express.Router();

const Location = require('../models/location');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}_${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Error mime type of file'), false);
  }
};

const upload = multer({
  storage,
  limits: 1024 * 1024 * 5,
  fileFilter,
});

router.get('/', (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/');
  }
  return res.render('admin');
});

router.get('/add-location', (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/');
  }
  return res.render('add-location');
});

router.post('/add-location', upload.single('picture'), async (req, res) => {
  const {
    name, address, intro,
  } = req.body;
  const location = new Location({
    name,
    address,
    intro,
    picture: req.file.path,
  });

  let locationCreated = null;
  try {
    locationCreated = await location.save();
  } catch (error) {
    console.log(error);
    return res.render('add-location', { error: 'An error has occurred, please try again in a few minutes.' });
  }

  if (!locationCreated) {
    console.log("Don't created");
    return res.render('add-location', { error: 'An error has occurred, please try again in a few minutes.' });
  }
  return res.redirect('/admin/manage-location');
});

router.get('/manage-location', async (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/');
  }

  let locations = null;
  try {
    locations = await Location.find();
  } catch (error) {
    console.log(error);
  }

  if (!locations) {
    locations = [];
  }
  return res.render('manage-location', { locations });
});

router.post('/manage-location/delete/:idLocation', async (req, res) => {
  if (!req.session.admin) {
    return res.redirect('/');
  }

  const { idLocation } = req.params;

  let locationDeleted = null;

  try {
    locationDeleted = await Location.findByIdAndDelete(idLocation);
  } catch (error) {
    console.log(error);
  }

  if (!locationDeleted) {
    return res.render('manage-location', { error: 'An error has occurred, please try again in a few minutes.' });
  }

  return res.redirect('/admin/manage-location');
});

module.exports = router;
