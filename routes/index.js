const express = require('express');

const router = express.Router();

const TourGuide = require('../models/tourguide');

const Location = require('../models/location');

const rd = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

/* GET home page. */
router.get('/', (req, res) => {
  const listTG = TourGuide.find({}).populate('Account').sort({ star: 1 }).limit(5)
    .then(rawListTG => rawListTG.map(tg => ({
      avtTG: `images/promo_${rd(3, 1)}.jpg`,
      nameTG: tg.idTourGuide.fullname,
      address: tg.address,
    })));

  //
  const listPlace = Location.find({}).sort({ star: 1 }).limit(5)
    .then(rawListPlace => rawListPlace.map(place => ({
      imgPlace: `images/tour-${rd(8, 1)}.jpg`,
      name: place.name,
      des: place.intro,
    })));

  Promise.all([listTG, listPlace])
    .then((allList) => {
      res.render('home', { title: 'Find tour guide', listTG: allList[0], listPlace: allList[1] });
    })
    .catch(() => {
      res.render('home', { title: 'Find tour guide' });
    });
  // promise instanceof Promise
});

module.exports = router;
