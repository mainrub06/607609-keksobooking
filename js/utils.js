'use strict';

(function () {
  var fieldsets = document.querySelectorAll('fieldset');
  var DEBOUNCE_INTERVAL = 500;
  window.utils = {
    // глобальные константы
    // глобальные переменные
    mapPinMain: document.querySelector('.map__pin--main'),
    form: document.querySelector('.ad-form'),
    // методы для генерации данных в data.js
    getRandomNumber: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    renderNumber: function (data) {
      var arr = [];
      for (var i = 0; arr.length < data; i++) {
        var rundomNumber = window.utils.getRandomNumber(1, data);
        if (arr.indexOf(rundomNumber) === -1) {
          arr.push(rundomNumber);
        }
      }
      return arr;
    },
    renderPosition: function (data) {
      var arr = [];
      for (var i = 0; arr.length < data.length; i++) {
        var rundomNumber = data[window.utils.getRandomNumber(0, data.length - 1)];
        if (arr.indexOf(rundomNumber) === -1) {
          arr.push(rundomNumber);
        }
      }
      return arr;
    },
    renderFeatures: function (data) {
      var arr = [];
      for (var i = 0; i < data.length; i++) {
        var rundomNumber = data[window.utils.getRandomNumber(0, data.length - 1)];
        if (arr.indexOf(rundomNumber) === -1) {
          arr.push(rundomNumber);
        }
      }
      return arr;
    },
    // методы для form.js
    addAttributeDisabled: function (value) {
      for (var z = 0; z < fieldsets.length; z++) {
        fieldsets[z].disabled = value;
      }
    },
    getTime: function (dataIn, dataOut) {
      for (var u = 0; u < dataIn.options.length; u++) {
        var option = dataIn.options[u];
        if (option.selected) {
          dataOut.options[u].selected = true;
        }
      }
    },
    renderErrorMessage: function (errorMessage) {
      var message = document.createElement('div');
      message.classList.add('error-message');
      message.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', message);
    },
    debounce: function (cb) {
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
    }
  };
})();
