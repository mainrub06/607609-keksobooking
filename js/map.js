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
var ESC_KEYCODE = 27;

var MAIN_PIN = {
  WIDTH: 65,
  HEIGHT: 87
};

var MIN_PRICES = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

var FRAMES = {
  MAX_Y: 630,
  MIN_Y: 130,
  MAX_X: 1200,
  MIN_X: -2
};

// Функции рандомных зачений

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


var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPin = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');

var fragmentPin = document.createDocumentFragment();

var renderElement = function (mapElement) {
  var pin = templatePin.cloneNode(true);
  var openPopup = function () {
    var fragmentPopup = map.querySelector('.map__card');
    if (fragmentPopup) {
      fragmentPopup.remove();
    }
    renderPopup(mapElement);
  };

  pin.addEventListener('click', function () {
    openPopup();
  });

  pin.style.left = (mapElement.location.x - (PIN_WIDTH / 2)) + 'px';
  pin.style.top = (mapElement.location.y - (PIN_HEIGHT / 2)) + 'px';
  pin.querySelector('img').src = mapElement.author.avatar;
  pin.querySelector('img').alt = 'заголовок объявления';

  return pin;
};

for (var j = 0; j < objectsData.length; j++) {
  fragmentPin.appendChild(renderElement(objectsData[j]));
}

var templatePopup = document.querySelector('#card').content.querySelector('.map__card');

var featuresList = templatePopup.querySelector('.popup__features');
var feature = templatePopup.querySelectorAll('.popup__feature');

for (var w = 0; w < feature.length; w++) {
  featuresList.removeChild(feature[w]);
}

var photoList = templatePopup.querySelector('.popup__photos');
var photoElement = photoList.querySelector('.popup__photo');

photoList.removeChild(photoElement);

var featuresMap = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elevator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner'
};

var renderFeatureElement = function (featuresObject) {
  var objects = document.createDocumentFragment();
  for (var z = 0; z < featuresObject.offer.features.length; z++) {
    var newElement = document.createElement('li');
    newElement.classList = 'popup__feature';
    newElement.classList.add(featuresMap[featuresObject.offer.features[z]]);
    objects.appendChild(newElement);
  }

  return objects;
};

var renderPhotoElement = function (photoObject) {
  var objects = document.createDocumentFragment();
  for (var y = 0; y < photoObject.offer.photos.length; y++) {
    var photoCard = document.createElement('img');
    photoCard.classList = 'popup__photo';
    photoCard.setAttribute('width', '45px');
    photoCard.setAttribute('height', '40px');
    photoCard.src = photoObject.offer.photos[y];
    photoCard.alt = 'Фотография жилья';
    objects.appendChild(photoCard);
  }

  return objects;
};

var typesMap = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var renderPopup = function (popup) {
  var popupEl = templatePopup.cloneNode(true);
  var type = popupEl.querySelector('.popup__type');
  var popupClose = popupEl.querySelector('.popup__close');

  popupClose.addEventListener('click', function () {
    popupEl.remove();
  });
  document.removeEventListener('click', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupEl.remove();
    }
  });

  popupEl.querySelector('.popup__avatar').src = popup.author.avatar;
  popupEl.querySelector('.popup__title').textContent = popup.offer.title;
  popupEl.querySelector('.popup__text--address').textContent = popup.offer.address;
  popupEl.querySelector('.popup__text--price').textContent = popup.offer.price + '₽/ночь';
  type.textContent = typesMap[popup.offer.type];
  popupEl.querySelector('.popup__text--capacity').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';
  popupEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;

  popupEl.querySelector('.popup__features').appendChild(renderFeatureElement(popup));

  popupEl.querySelector('.popup__description').textContent = popup.offer.description;

  popupEl.querySelector('.popup__photos').appendChild(renderPhotoElement(popup));

  mapFiltersContainer.insertAdjacentElement('beforebegin', popupEl);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      popupEl.remove();
    }
  });

  return popupEl;
};

// Здесь заливаю рандомный попап

var mapPinMain = mapPin.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var fieldsets = form.querySelectorAll('fieldset');

var addAttributeDisabled = function (value) {
  for (var z = 0; z < fieldsets.length; z++) {
    fieldsets[z].disabled = value;
  }
};

addAttributeDisabled(true);

var adressInput = document.querySelector('#address');

var fillAddress = function () {
  adressInput.value = (mapPinMain.offsetTop + MAIN_PIN.HEIGHT) + ', ' + (mapPinMain.offsetLeft + MAIN_PIN.WIDTH / 2);
  adressInput.disabled = true;
};

fillAddress();

var type = document.querySelector('#type');
var price = document.querySelector('#price');

var setMinValue = function () {
  for (var h = 0; h < type.options.length; h++) {
    var option = type.options[h];
    if (option.selected) {
      if (option.value === 'bungalo') {
        price.min = MIN_PRICES.BUNGALO;
        price.placeholder = MIN_PRICES.BUNGALO;
      } else if (option.value === 'flat') {
        price.min = MIN_PRICES.FLAT;
        price.placeholder = MIN_PRICES.FLAT;
      } else if (option.value === 'house') {
        price.min = MIN_PRICES.HOUSE;
        price.placeholder = MIN_PRICES.HOUSE;
      } else if (option.value === 'palace') {
        price.min = MIN_PRICES.PALACE;
        price.placeholder = MIN_PRICES.PALACE;
      }
    }
  }
};

type.addEventListener('change', function () {
  setMinValue();
});

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var getTime = function (dataIn, dataOut) {
  for (var u = 0; u < dataIn.options.length; u++) {
    var option = dataIn.options[u];
    if (option.selected) {
      dataOut.options[u].selected = true;
    }
  }
};

timeIn.addEventListener('change', function () {
  getTime(timeIn, timeOut);
});

timeOut.addEventListener('change', function () {
  getTime(timeOut, timeIn);
});


var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

var addDisabledCapacity = function (data0, data1, data2, data3) {
  capacity.options[0].disabled = data0;
  capacity.options[1].disabled = data1;
  capacity.options[2].disabled = data2;
  capacity.options[3].disabled = data3;
};

roomNumber.addEventListener('change', function () {
  for (var r = 0; r < roomNumber.options.length; r++) {
    var option = roomNumber.options[r];

    if (option.selected && option.value === '1') {
      addDisabledCapacity(true, true, false, true);
    }
    if (option.selected && option.value === '2') {
      addDisabledCapacity(true, false, false, true);
    }
    if (option.selected && option.value === '3') {
      addDisabledCapacity(false, false, false, true);
    }
    if (option.selected && option.value === '100') {
      addDisabledCapacity(true, true, true, false);
    }
  }
});


mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  map.classList.remove('map--faded');
  mapPin.appendChild(fragmentPin);
  addAttributeDisabled(false);
  form.classList.remove('ad-form--disabled');
  setMinValue();
  addDisabledCapacity(true, true, false, true);

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    fillAddress();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if ((mapPinMain.offsetTop - shift.y) > FRAMES.MIN_Y && (mapPinMain.offsetTop - shift.y) < FRAMES.MAX_Y) {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }

    if ((mapPinMain.offsetLeft - shift.x) >= FRAMES.MIN_X && (mapPinMain.offsetLeft - shift.x) <= FRAMES.MAX_X - MAIN_PIN.WIDTH) {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();


    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


form.addEventListener('submit', function (evt) {
  evt.preventDefault();
});
