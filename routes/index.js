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
  console.log(listTG);
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
      address: 'Au Co',
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
  console.log('a');
  const listTG = TourGuide.find({}).populate('idTourGuide').sort({ star: 1 }).limit(limitTG)
    .then(fakeTG)
    .then(rawListTG => rawListTG.map((tg) => {
      console.log(1);
      console.log(tg.idTourGuide);
      return {
        avtUrl: `images/promo-${rd(3, 1)}.jpg`,
        nameTG: tg.fullname,
        address: tg.address,
        id: tg._id,
      };
    }));

  const listPlace = Location.find({}).sort({ star: 1 }).limit(limitPlace)
    .then(fakePlace)
    .then(rawListPlace => rawListPlace.map(place => ({
      imgPlace: `images/tour-${rd(8, 1)}.jpg`,
      namePlace: place.name,
      des: place.intro,
      id: place._id,
    })));

  Promise.all([listTG, listPlace])
    .then((allList) => {
      res.render('home', {
        title: 'Find tour guide', listTG: allList[0], listPlace: allList[1], username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render('home', { title: 'Find tour guide', username: req.session.username });
    });
});

router.get('/tours', (req, res) => {
  res.render('tours', { username: req.session.username });
});

// GET List Tour Guides
router.get('/tour-guides', (req, res) => {
  TourGuide.find({}).populate('idTourGuide').sort({ star: 1 })
    .then(fakeTG)
    .then(rawListTG => rawListTG.map(tg => ({
      avtUrl: `images/promo-${rd(3, 1)}.jpg`,
      nameTG: tg.idTourGuide.fullname,
      address: tg.address,
      id: tg._id,
      price: tg.price,
    })))
    .then((listTG) => {
      console.log(listTG);
      res.render('tour-guides', { listTG, username: req.session.username });
    });
});

// GET tour-guides detail
router.get('/tour-guides-detail', (req, res) => {
  const { id } = req.query;

  TourGuide.findById(id).populate('idTourGuide')
    .then((tg) => {
      tg.avtUrl = `images/promo-${rd(3, 1)}.jpg`;
      tg.fullname = tg.idTourGuide.fullname;
      tg.rank = rd(5, 2);
      tg.gender = tg.idTourGuide.gender;
      tg.birthdayDate = tg.idTourGuide.birthdayDate;
      return tg;
    })
    .then((tourGuide) => {
      res.render('tour-guides-detail', { username: req.session.username, tourGuide });
    })
    .catch(() => {
      res.redirect('/tour-guides');
    });
});

router.get('/place-detail', (req, res) => {
  TourGuide.find({}).populate('idTourGuide').sort({ star: 1 }).limit(limitTG)
    .then(fakeTG)
    .then(rawListTG => rawListTG.map(tg => ({
      avtUrl: `images/promo-${rd(3, 1)}.jpg`,
      nameTG: tg.idTourGuide.fullname,
      address: tg.address,
      id: tg._id,
    })))
    .then((listTG) => {
      console.log(listTG);
      res.render('place-detail', { title: 'detail', listTG });
    });
});
module.exports = router;
