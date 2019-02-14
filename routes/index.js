const express = require('express');

const router = express.Router();
const TourGuide = require('../models/tourguide');
const Location = require('../models/location');

const rd = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const limitTG = 4;
const limitPlace = 5;

const fakeTG = (listTG) => {
  if (!Array.isArray(listTG)) {
    listTG = [];
  }
  if (listTG.length === 0) {
    listTG = [{
      idTourGuide: { fullname: 'Tu Anh Hong' },
      address: 'Ngo Si Lien',
    },
    {
      idTourGuide: { fullname: 'Nguyen Quang An' },
      address: 'Nguyen Luong Bang',
    }, {
      idTourGuide: { fullname: 'Tran Huu Trung' },
      address: 'Dong Ke',
    }, {
      idTourGuide: { fullname: 'Phuoc Binh' },
      address: 'Lac Long Quan',
    }];
  }
  return listTG;
};

const fakePlace = (listPlace) => {
  if (!Array.isArray(listPlace)) {
    listPlace = [];
  }
  if (listPlace.length === 0) {
    listPlace = [
      { namePlace: 'Thien Mu Pagoda', intro: 'Once the seat of the Nguyen emperors, the Citadel is a sprawling complex of grand palaces, ornate temples, walls and gates Another important landmark on the river is the city’s official symbol, the Thien Mu Pagoda' },
      { namePlace: 'Ha Long Bay', intro: 'With its aqua-green water and cluster of limestone rocky outcrops rising from the water like sea dragons, Ha Long Bay resembles a scene from a fantasy story' },
      { namePlace: 'My Son', intro: 'Located on the central coast of Vietnam near the Duy Phú village is the important archaeological site known as My Son' },
      { namePlace: 'Hoi An', intro: 'Located off the coast of the South China Sea in South Central Vietnam, Hoi An is a beautiful, old city dating back 2,000 years to the Champa Kingdom' },
      { namePlace: 'Sapa', intro: 'Surrounded by pictorial mountains, rice terraces and a diversity of hill tribes in the remote northwest of Vietnam, Sapa is a quiet town frequently used as a base for trekking in the Hoang Lien Son Mountains and touring rice paddies and traditional villages' },
    ];
  }
  return listPlace;
};
/* GET home page. */
router.get('/', (req, res) => {
  const listTG = TourGuide.find({}).populate('Account').sort({ star: 1 }).limit(limitTG)
    .then(fakeTG)
    .then(rawListTG => rawListTG.map(tg => ({
      avtUrl: `images/promo-${rd(3, 1)}.jpg`,
      nameTG: tg.idTourGuide.fullname,
      address: tg.address,
    })));

  const listPlace = Location.find({}).sort({ star: 1 }).limit(limitPlace)
    .then(fakePlace)
    .then(rawListPlace => rawListPlace.map(place => ({
      imgPlace: `images/tour-${rd(8, 1)}.jpg`,
      namePlace: place.name,
      des: place.intro,
    })));

  Promise.all([listTG, listPlace])
    .then((allList) => {
      res.render('home', { title: 'Find tour guide', listTG: allList[0], listPlace: allList[1] });
    })
    .catch(() => {
      res.render('home', { title: 'Find tour guide' });
    });
});

module.exports = router;
