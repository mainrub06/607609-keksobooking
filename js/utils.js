'use strict';

(function () {
  var ESC_CODE = 27;
  var fieldsets = document.querySelectorAll('fieldset');
  var DEBOUNCE_INTERVAL = 500;
  var pinMain = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');

  var getRandomNumber = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

  var renderNumber = function (data) {
    var arr = [];
    for (var i = 0; arr.length < data; i++) {
      var rundomNumber = window.utils.getRandomNumber(1, data);
      if (arr.indexOf(rundomNumber) === -1) {
        arr.push(rundomNumber);
      }
    }
    return arr;
  };

  var renderPosition = function (data) {
    var arr = [];
    for (var i = 0; arr.length < data.length; i++) {
      var rundomNumber = data[window.utils.getRandomNumber(0, data.length - 1)];
      if (arr.indexOf(rundomNumber) === -1) {
        arr.push(rundomNumber);
      }
    }
    return arr;
  };

  var renderFeatures = function (data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
      var rundomNumber = data[window.utils.getRandomNumber(0, data.length - 1)];
      if (arr.indexOf(rundomNumber) === -1) {
        arr.push(rundomNumber);
      }
    }
    return arr;
  };

  var addAttributeDisabled = function (value) {
    for (var z = 0; z < fieldsets.length; z++) {
      fieldsets[z].disabled = value;
    }
  };

  var getTime = function (dataIn, dataOut) {
    for (var u = 0; u < dataIn.options.length; u++) {
      var option = dataIn.options[u];
      if (option.selected) {
        dataOut.options[u].selected = true;
      }
    }
  };

  var renderErrorMessage = function (errorMessage) {
    var message = document.createElement('div');
    message.classList.add('error-message');
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.utils = {
    mapPinMain: pinMain,
    form: form,
    escCode: ESC_CODE,

    getRandomNumber: getRandomNumber,
    renderNumber: renderNumber,
    renderPosition: renderPosition,
    renderFeatures: renderFeatures,
    addAttributeDisabled: addAttributeDisabled,
    getTime: getTime,
    renderErrorMessage: renderErrorMessage,
    debounce: debounce
  };
})();
