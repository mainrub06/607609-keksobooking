'use strict';

(function () {
  var FRAMES = {
    MAX_Y: 630,
    MIN_Y: 130,
    MAX_X: 1200,
    MIN_X: -2
  };
  var MAIN_PIN = {
    WIDTH: 65,
    HEIGHT: 87,
    TOP: 375,
    LEFT: 570
  };
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pins');

  var renderElement = function (mapElement) {
    var pin = templatePin.cloneNode(true);
    var openPopup = function () {
      var fragmentPopup = map.querySelector('.map__card');
      if (fragmentPopup) {
        fragmentPopup.remove();
      }
      window.card.renderPopup(mapElement);
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

  var onLoadSuccess = function (adData) {
    window.pin.data = adData;
    var filteredData = renderEvents();
    renderPinsMarkup(filteredData);
  };

  var onLoadError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  var renderPinsMarkup = function (adData) {
    if (mapPin.fragmentPin) {
      removeMapPins();
    }
    var fragmentPin = document.createDocumentFragment();
    for (var j = 0; j < adData.length; j++) {
      if (adData[j].offer && adData[j].author && adData[j].location) {
        fragmentPin.appendChild(renderElement(adData[j]));
      }
    }
    mapPin.appendChild(fragmentPin);
  };


  var mapActive = function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');

    window.backend.load(onLoadSuccess, onLoadError);

    // housingType.addEventListener('change', function () {
    //   window.backend.load(onLoadSuccess, onLoadError);
    //   for (var i = 0; i < housingType.options.length; i++) {
    //     var option = housingType.options[i];

    //   }
    // });

    window.utils.addAttributeDisabled(false);
    window.utils.form.classList.remove('ad-form--disabled');
    window.setFormData.setMinValue();
    window.setFormData.addDisabledCapacity(true, true, false, true);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      window.setFormData.fillAddress();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var calc = {
        x: window.utils.mapPinMain.offsetLeft - shift.x,
        y: window.utils.mapPinMain.offsetTop - shift.y
      };

      if (calc.y > FRAMES.MIN_Y && calc.y < FRAMES.MAX_Y) {
        window.utils.mapPinMain.style.top = calc.y + 'px';
      }

      if (calc.x >= FRAMES.MIN_X && calc.x <= FRAMES.MAX_X - MAIN_PIN.WIDTH) {
        window.utils.mapPinMain.style.left = calc.x + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();


      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.utils.mapPinMain.addEventListener('mousedown', mapActive);

  var removeMapPins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPinsItems.length; j++) {
      mapPinsItems[j].remove();
    }
  };

  var deactivateMap = function () {
    var mapCard = document.querySelector('.map__card');
    map.classList.add('map--faded');
    removeMapPins();
    if (mapCard) {
      mapCard.remove();
    }
    window.utils.mapPinMain.style.top = MAIN_PIN.TOP + 'px';
    window.utils.mapPinMain.style.left = MAIN_PIN.LEFT + 'px';
    window.utils.mapPinMain.addEventListener('mousedown', mapActive);
  };

  window.pin = {
    SIZE: MAIN_PIN,
    resetMap: deactivateMap,
    remove: removeMapPins
  };
})();
