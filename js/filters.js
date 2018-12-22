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
    allSelects.forEach(function (it) {
      it.disabled = false;
    });
    for (var d = 0; d < allSelects.length; d++) {
      allSelects[d].addEventListener('change', function (evt) {
        filterSelects[evt.target.id] = evt.target.value;
        filterPins();
      });
    }
    for (var c = 0; c < allCheckboxes.length; c++) {
      allCheckboxes[c].addEventListener('change', function () {
        filterPins();
      });
    }
  };

  var resetFilter = function () {
    allSelects.forEach(function (it) {
      it.value = 'any';
    });
    allCheckboxes.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivateFilter = function () {
    allSelects.forEach(function (it) {
      it.disabled = true;
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

  var isTypeAim = function (it) {
    if (filterSelects['housing-type'] === 'any') {
      return true;
    } else {
      return (it.offer.type === filterSelects['housing-type']);
    }
  };

  var isPriceAim = function (it) {
    if (filterSelects['housing-price'] === 'any') {
      return (it.offer.price > PRICE_MAP.ANY);
    } else if (filterSelects['housing-price'] === 'middle') {
      return (it.offer.price > PRICE_MAP.MIDDLE.MIN && it.offer.price < PRICE_MAP.MIDDLE.MAX);
    } else if (filterSelects['housing-price'] === 'low') {
      return (it.offer.price <= PRICE_MAP.LOW);
    } else if (filterSelects['housing-price'] === 'high') {
      return (it.offer.price >= PRICE_MAP.HIGH);
    }

    return false;
  };

  var isRoomsAim = function (it) {
    if (filterSelects['housing-rooms'] === 'any') {
      return true;
    } else {
      return it.offer.rooms === +filterSelects['housing-rooms'];
    }
  };

  var isGuestsAim = function (it) {
    if (filterSelects['housing-guests'] === 'any') {
      return true;
    } else {
      return it.offer.guests === +filterSelects['housing-guests'];
    }
  };

  window.filters = {
    active: activateFilters,
    deactivate: deactivateFilter
  };

})();
