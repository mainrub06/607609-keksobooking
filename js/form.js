'use strict';

(function () {
  var adFormHeader = document.querySelector('.ad-form-header');

  window.utils.addAttributeDisabled(true);

  var adressInput = document.querySelector('#address');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  type.addEventListener('change', function () {
    setValue();
  });

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    window.utils.getTime(timeIn, timeOut);
  });

  timeOut.addEventListener('change', function () {
    window.utils.getTime(timeOut, timeIn);
  });

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var roomArray = roomNumber.querySelectorAll('option');
  roomNumber.addEventListener('change', function () {
    roomArray.forEach(function (item) {
      if (item.selected && item.value === '1') {
        addDisabledCapacity(true, true, false, true);
      }
      if (item.selected && item.value === '2') {
        addDisabledCapacity(true, false, false, true);
      }
      if (item.selected && item.value === '3') {
        addDisabledCapacity(false, false, false, true);
      }
      if (item.selected && item.value === '100') {
        addDisabledCapacity(true, true, true, false);
      }
    });
  });

  var setAddressCoords = function (coords) {
    adressInput.value = coords.LEFT + ', ' + coords.TOP;
  };

  var deactivateForm = function () {
    var adFormFieldsets = document.querySelectorAll('.ad-form__element');
    var mainForm = window.utils.form;
    mainForm.reset();
    mainForm.classList.add('ad-form--disabled');
    setAddressCoords(window.pin.SIZE);

    adFormFieldsets.forEach(function (item) {
      item.disabled = true;
    });
    adFormHeader.disabled = true;
  };

  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var showSuccess = function () {
    var openSuccess = success.cloneNode(true);
    main.appendChild(openSuccess);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.escCode) {
        openSuccess.remove();
      }
    });
    document.addEventListener('click', function () {
      openSuccess.remove();
    });
  };

  var showError = function () {
    var openError = error.cloneNode(true);
    var button = openError.querySelector('.error__button');
    main.appendChild(openError);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.utils.escCode) {
        openError.remove();
      }
    });
    button.addEventListener('click', function () {
      openError.remove();
    });
  };

  var resetWebPage = function () {
    deactivateForm();
    window.pin.resetMap();
    window.avatar.reset();
  };

  var onSubmitSuccess = function () {
    showSuccess();
    resetWebPage();
  };

  var onSubmitError = function () {
    showError();
  };

  var resetButton = document.querySelector('.ad-form__reset');

  window.utils.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(window.utils.form);
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  });

  resetButton.addEventListener('click', function () {
    resetWebPage();
  });

  var TypesPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var typeArray = type.querySelectorAll('option');
  var setValue = function () {
    typeArray.forEach(function (item) {
      if (item.selected) {
        price.min = TypesPriceMap[item.value];
        price.placeholder = TypesPriceMap[item.value];
      }
    });
  };

  var capacityArray = capacity.querySelectorAll('option');
  var addDisabledCapacity = function (data0, data1, data2, data3) {
    capacity.options[0].disabled = data0;
    capacity.options[1].disabled = data1;
    capacity.options[2].disabled = data2;
    capacity.options[3].disabled = data3;

    capacityArray.forEach(function (item) {
      if (item.disabled === false) {
        item.selected = true;
      }
    });
  };

  var fillAddress = function () {
    adressInput.value = (window.utils.mapPinMain.offsetTop + window.pin.SIZE.HEIGHT) + ', ' + (window.utils.mapPinMain.offsetLeft + window.pin.SIZE.WIDTH / 2);
    adressInput.readOnly = true;
  };

  fillAddress();

  window.setFormData = {
    setMinValue: setValue,
    addDisabledCapacity: addDisabledCapacity,
    fillAddress: fillAddress
  };
})();
