'use strict';

(function () {

  var PRICE_MAP = {
    ANY: 0,
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    LOW: 10000,
    HIGH: 50000
  };

  var filterSelects = {
    'housing-type': 'any',
    'housing-price': 'any',
    'housing-rooms': 'any',
    'housing-guests': 'any'
  };

  var allSelects = document.querySelectorAll('.map__filter');
  var allCheckboxes = document.querySelectorAll('.map__checkbox');
  var activateFilters = function () {
    allSelects.forEach(function (item) {
      item.disabled = false;
    });

    allSelects.forEach(function (item) {
      item.addEventListener('change', function (evt) {
        filterSelects[evt.target.id] = evt.target.value;
        filterPins();
      });
    });

    allCheckboxes.forEach(function (item) {
      item.addEventListener('change', function () {
        filterPins();
      });
    });
  };

  var resetFilter = function () {
    allSelects.forEach(function (item) {
      item.value = 'any';
    });
    allCheckboxes.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivateFilter = function () {
    allSelects.forEach(function (item) {
      item.disabled = true;
    });
    resetFilter();
  };

  var housingFeatures = document.querySelector('#housing-features');
  var filtrationByFeatures = function (item) {
    var checkedFeaturesItems = housingFeatures.querySelectorAll('input:checked');
    var renderArrayFeatures = [].map.call(checkedFeaturesItems, function (el) {
      return el;
    });
    return renderArrayFeatures.every(function (element) {
      return item.offer.features.indexOf(element.value) !== -1;
    });
  };

  var filterPins = window.utils.debounce(function () {
    var data = window.pin.data;
    var newFilteredArray = data.filter(isTypeAim).filter(isPriceAim).filter(isRoomsAim).filter(isGuestsAim).filter(filtrationByFeatures);
    window.pin.render(newFilteredArray);
  });

  var isTypeAim = function (item) {
    if (filterSelects['housing-type'] === 'any') {
      return true;
    } else {
      return (item.offer.type === filterSelects['housing-type']);
    }
  };

  var isPriceAim = function (item) {
    if (filterSelects['housing-price'] === 'any') {
      return (item.offer.price > PRICE_MAP.ANY);
    } else if (filterSelects['housing-price'] === 'middle') {
      return (item.offer.price > PRICE_MAP.MIDDLE.MIN && item.offer.price < PRICE_MAP.MIDDLE.MAX);
    } else if (filterSelects['housing-price'] === 'low') {
      return (item.offer.price <= PRICE_MAP.LOW);
    } else if (filterSelects['housing-price'] === 'high') {
      return (item.offer.price >= PRICE_MAP.HIGH);
    }

    return false;
  };

  var isRoomsAim = function (item) {
    if (filterSelects['housing-rooms'] === 'any') {
      return true;
    } else {
      return item.offer.rooms === +filterSelects['housing-rooms'];
    }
  };

  var isGuestsAim = function (item) {
    if (filterSelects['housing-guests'] === 'any') {
      return true;
    } else {
      return item.offer.guests === +filterSelects['housing-guests'];
    }
  };

  window.filters = {
    active: activateFilters,
    deactivate: deactivateFilter
  };

})();
