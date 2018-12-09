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
    HEIGHT: 87
  };
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPin = document.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();

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

  for (var j = 0; j < window.data.objectsData.length; j++) {
    fragmentPin.appendChild(renderElement(window.data.objectsData[j]));
  }

  window.utils.mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');
    mapPin.appendChild(fragmentPin);
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
  });

  window.pin = {
    MAIN_PIN: MAIN_PIN
  };
})();
