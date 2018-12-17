'use strict';

var housingType = document.querySelector('#housing-type');

function isAnyType(item) {
  return (item.type);
}

function isPalaceType(item) {
  return (item.offer.type === 'palace');
}

function isFlatType(item) {
  return (item.offer.type === 'flat');
}

function isHouseType(item) {
  return (item.offer.type === 'house');
}

function isBungaloType(item) {
  return (item.offer.type === 'bungalo');
}
// const femaleHeroes = heroes.filter(isFemaleHero);

var getFilterPins = function (type, price, rooms, guests, features) {

};
