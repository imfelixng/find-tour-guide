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

router.get('/add-location', (req, res) => {
  res.render('add-location');
});

router.post('/add-location', upload.single('picture'), async (req, res) => {
  const {
    name, address, intro, picture,
  } = req.body;
  const location = new Location({
    name,
    address,
    intro,
    picture,
  });

  let locationCreated = null;
  try {
    locationCreated = await location.save();
  } catch (error) {
    console.log(error);
  }

  if (!locationCreated) {
    console.log("Don't created");
  }

  res.redirect('/admin/manage-location');
});

router.get('/manage-location', (req, res) => {
  res.send('OK');
});

module.exports = router;
