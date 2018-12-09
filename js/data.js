'use strict';

(function () {
  var TITLE_OFFER = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
  var TIME_TO_CHECK = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 100;
  var MIN_WIDTH = 0;
  var MAX_WIDTH = 1200;
  var MIN_HEIGHT = 130;
  var MAX_HEIGHT = 630;
  var DATA_COUNT = 8;

  var objectsData = [];

  var avatarSrc = window.utils.renderNumber(DATA_COUNT);
  var renderTitle = window.utils.renderPosition(TITLE_OFFER);

  for (var i = 0; i < DATA_COUNT; i++) {
    var locationX = window.utils.getRandomNumber(MIN_WIDTH, MAX_WIDTH);
    var locationY = window.utils.getRandomNumber(MIN_HEIGHT, MAX_HEIGHT);
    var mapData = {
      author: {
        avatar: 'img/avatars/user0' + avatarSrc[i] + '.png'
      },

      offer: {
        title: renderTitle[i],
        address: locationX + ', ' + locationY,
        price: window.utils.getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: TYPE_OFFER[window.utils.getRandomNumber(0, TYPE_OFFER.length - 1)],
        rooms: window.utils.getRandomNumber(MIN_ROOMS, MAX_ROOMS),
        guests: window.utils.getRandomNumber(MIN_GUESTS, MAX_GUESTS),
        checkin: TIME_TO_CHECK[window.utils.getRandomNumber(0, TIME_TO_CHECK.length - 1)],
        checkout: TIME_TO_CHECK[window.utils.getRandomNumber(0, TIME_TO_CHECK.length - 1)],
        features: window.utils.renderFeatures(FEATURES),
        description: ' ',
        photos: window.utils.renderPosition(PHOTOS)
      },

      location: {
        x: locationX,
        y: locationY
      }
    };

    objectsData.push(mapData);
  }

  window.data = {
    objectsData: objectsData
  };

})();
