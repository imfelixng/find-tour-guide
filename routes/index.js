var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let arrPlaces = [
    {
      imgPlace: URL('../imgages/'),
      namePlace: 'plac 1',
      des: 'saa'
    },
    {
      imgPlace: 'dfffdffd',
      namePlace: 'plac 1',
      des: 'saa'
    },
    {
      imgPlace: 'dfffdffd',
      namePlace: 'plac 1',
      des: 'saa'
    }
  ];
  res.render('home', { title: 'Find tour guide', list: arr });
});

module.exports = router;
