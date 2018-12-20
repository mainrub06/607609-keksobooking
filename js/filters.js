'use strict';

var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeatures = document.querySelector('#housing-features');

var PRICE_MAP = {
  ANY: 0,
  MIDDLE: {
    MIN: 10000,
    MAX: 50000
  },
  LOW: 10000,
  HIGH: 50000
};

var typeHandler = [];

housingType.addEventListener('change', function (e) {
  var target = e.target;

});

var getTypeAim = function (it) {
  if (typeHandler.indexOf === -1) {
    return it.offer.type;
  } else {
    return it.offer.type === typeHandler[1];
  }
};

var filterObject = {
  'housing-price': 'any'
};


var renderEvents = function () {
  var data = window.pin.data;
  housingPrice.addEventListener('change', function (z) {
    // var target = z.target;
    filterObject[z.target.id] = z.target.value;
  });

  return data;
};

console.log(filterObject['housing-price']);

var getPriceAim = function (it) {
  if (priceHandler === 'any') {
    return (it.offer.price >= PRICE_MAP.ANY);
  } else if (priceHandler === 'middle') {
    return (it.offer.price > PRICE_MAP.MIDDLE.MIN && it.offer.price < PRICE_MAP.MIDDLE.MAX);
  } else if (priceHandler === 'low') {
    return (it.offer.price <= PRICE_MAP.LOW);
  } else if (priceHandler === 'high') {
    return (it.offer.price >= PRICE_MAP.HIGH);
  }
};

var isHousingData = function (it) {
  return getPriceAim(it) &&
    getTypeAim(it);
};

var activateFilters = function (adData) {
  window.pin.remove();
  var filterData = adData.filter(isHousingData);
  return filterData;
};

var deactivateFilters = function () {

};
