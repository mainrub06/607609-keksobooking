'use strict';

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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomNumber = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

var renderNumber = function (data) {
  var arr = [];
  for (var i = 0; arr.length < data; i++) {
    var rundomNumber = getRandomNumber(1, data);

    if (arr.indexOf(rundomNumber) === -1) {
      arr.push(rundomNumber);
    }
  }

  return arr;
};

var renderPosition = function (data) {
  var arr = [];
  for (var i = 0; arr.length < data.length; i++) {
    var rundomNumber = data[getRandomNumber(0, data.length - 1)];

    if (arr.indexOf(rundomNumber) === -1) {
      arr.push(rundomNumber);
    }
  }

  return arr;
};

var renderFeatures = function (data) {
  var arr = [];
  for (var i = 0; i < data.length; i++) {
    var rundomNumber = data[getRandomNumber(0, data.length - 1)];

    if (arr.indexOf(rundomNumber) === -1) {
      arr.push(rundomNumber);
    }
  }

  return arr;
};

var objectsData = [];

var avatarSrc = renderNumber(DATA_COUNT);
var renderTitle = renderPosition(TITLE_OFFER);

for (var i = 0; i < DATA_COUNT; i++) {
  var locationX = getRandomNumber(MIN_WIDTH, MAX_WIDTH);
  var locationY = getRandomNumber(MIN_HEIGHT, MAX_HEIGHT);
  var mapData = {
    author: {
      avatar: 'img/avatars/user0' + avatarSrc[i] + '.png'
    },

    offer: {
      title: renderTitle[i],
      address: locationX + ', ' + locationY,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: TYPE_OFFER[getRandomNumber(0, TYPE_OFFER.length - 1)],
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: TIME_TO_CHECK[getRandomNumber(0, TIME_TO_CHECK.length - 1)],
      checkout: TIME_TO_CHECK[getRandomNumber(0, TIME_TO_CHECK.length - 1)],
      features: renderFeatures(FEATURES),
      description: ' ',
      photos: renderPosition(PHOTOS)
    },

    location: {
      x: locationX,
      y: locationY
    }
  };

  objectsData.push(mapData);
}

console.log(objectsData);

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var fragmentPin = document.createDocumentFragment();

var renderElement = function (mapElement) {
  var pin = templatePin.cloneNode(true);

  pin.style = 'left: ' + (mapElement.location.x - (PIN_WIDTH / 2)) + 'px; top: ' + (mapElement.location.y - (PIN_HEIGHT / 2)) + 'px;';
  pin.querySelector('img').src = mapElement.author.avatar;
  pin.querySelector('img').alt = 'заголовок объявления';

  return pin;
};

for (var j = 0; j < objectsData.length; j++) {
  fragmentPin.appendChild(renderElement(objectsData[j]));
}

mapPin.appendChild(fragmentPin);

var templatePopup = document.querySelector('#card').content.querySelector('.map__card');
var fragmentPopup = document.createDocumentFragment();
var featuresList = templatePopup.querySelector('.popup__features');
var feature = featuresList.querySelector('.popup__feature');

featuresList.removeChild(feature);

var photoList = templatePopup.querySelector('.popup__photos');
var photoElement = photoList.querySelector('.popup__photo');

photoList.removeChild(photoElement);

var renderFeatureElement = function (featuresObject) {
  for (var z = 0; z < featuresObject.offer.features.length; z++) {
    var newElement = document.createElement('li');
    newElement.classList.contains('popup__feature', 'popup__feature--' + featuresObject.offer.features[z]);
    featuresList.appendChild(newElement);
  }
};

var renderPopup = function (popup) {
  var window = templatePopup.cloneNode(true);
  var type = window.querySelector('.popup__type');

  window.querySelector('.popup__title').textContent = popup.offer.title;
  window.querySelector('.popup__text--address').textContent = popup.offer.address;
  window.querySelector('.popup__text--price').textContent = popup.offer.price + '₽/ночь';
  type.textContent = popup.offer.type;
  if (type.textContent === 'flat') {
    type.textContent = 'Квартира';
  } else if (type.textContent === 'bungalo') {
    type.textContent = 'Бунгало';
  } else if (type.textContent === 'house') {
    type.textContent = 'Дом';
  } else if (type.textContent === 'palace') {
    type.textContent = 'Дворец';
  }
  window.querySelector('.popup__text--capacity').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';
  window.querySelector('.popup__text--time').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;

  renderFeatureElement(popup);

  window.querySelector('.popup__description').textContent = popup.offer.description;
  for (var q = 0; q < popup.offer.photos.length; q++) {
    var photoCard = document.createElement('img');
    photoCard.classList = '.popup__photo';
    photoCard.setAttribute('width', '45px');
    photoCard.setAttribute('height', '40px');
    photoCard.src = popup.offer.photos[q];
    photoCard.alt = 'Фотография жилья';
    photoList.appendChild(photoCard);
  }

  return window;
};

for (var d = 0; d < objectsData.length; d++) {
  fragmentPopup.appendChild(renderPopup(objectsData[d]));
}

var lastElement = map.querySelector('.map__filters-container');

map.insertBefore(fragmentPopup, lastElement);
