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
      { name: 'Vịnh Hạ Long', intro: 'Nằm ở bờ Tây của Vịnh Bắc Bộ, bao gồm vùng biển đảo thuộc TP Hạ Long, TP Cẩm Phả và một phần của huyện đảo Vân Đồn, tỉnh Quảng Ninh' },
      { name: 'Chùa Thiên Mụ', intro: 'Còn gọi là chùa Linh Mụ, là ngôi chùa cổ nằm trên đồi Hà Khê, tả ngạn sông Hương, cách trung tâm thành phố Huế khoảng 5km về phía tây' },
      { name: 'Hồ Hoàn Kiếm', intro: 'Còn được gọi là Hồ Gươm, là hồ nước ngọt tự nhiên của thành phố Hà Nội, hồ có diện tích khoảng 12 hecta' },
      { name: 'Hội An', intro: 'Từ thế kỷ XVI, XVII nơi đây đã nổi tiếng với tên gọi Faifoo, là nơi giao thương và là trung tâm buôn bán lớn của các thương nhân Nhật Bản, Trung Quốc, Bồ Ðào Nha, Italia… ở Đông Nam Á' },
      { name: 'Phú Quốc', intro: 'Hòn đảo này còn được mệnh danh là Đảo Ngọc, là hòn đảo lớn nhất Việt Nam, cũng là đảo lớn nhất trong quần thể 22 đảo tại vùng vịnh Thái Lan' },
    ];
  }
  return listPlace;
};
/* GET home page. */
router.get('/', (req, res) => {
  const listTG = TourGuide.find({}).populate('Account').sort({ star: 1 }).limit(limitTG)
    .then(fakeTG)
    .then(rawListTG => rawListTG.map(tg => ({
      avtTG: `images/promo_${rd(3, 1)}.jpg`,
      nameTG: tg.idTourGuide.fullname,
      address: tg.address,
    })));

  //
  const listPlace = Location.find({}).sort({ star: 1 }).limit(limitPlace)
    .then(fakePlace)
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
