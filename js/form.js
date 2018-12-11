'use strict';

(function () {
  var MIN_PRICES = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var adFormHeader = document.querySelector('.ad-form-header');

  window.utils.addAttributeDisabled(true);

  var adressInput = document.querySelector('#address');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  type.addEventListener('change', function () {
    window.setFormData.setMinValue();
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

  roomNumber.addEventListener('change', function () {
    for (var r = 0; r < roomNumber.options.length; r++) {
      var option = roomNumber.options[r];

      if (option.selected && option.value === '1') {
        window.setFormData.addDisabledCapacity(true, true, false, true);
      }
      if (option.selected && option.value === '2') {
        window.setFormData.addDisabledCapacity(true, false, false, true);
      }
      if (option.selected && option.value === '3') {
        window.setFormData.addDisabledCapacity(false, false, false, true);
      }
      if (option.selected && option.value === '100') {
        window.setFormData.addDisabledCapacity(true, true, true, false);
      }
    }
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

    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = true;
    }
    adFormHeader.disabled = true;
  };

  var success = document.querySelector('#success');

  var showSuccess = function () {
    var openSuccess = success.cloneNode(true);
    document.body.appendChild(openSuccess);
  //   success.addEventListener('keydown', function (evt) {
  //     if (evt.keyCode === 27) {
  //       document.body.remove(openSuccess);
  //     }
  //   });
  //   document.addEventListener('click', function () {
  //     document.body.remove(openSuccess);
  //   });
  };

  showSuccess();

  var onSubmitSuccess = function () {
    showSuccess();
    deactivateForm();
    // window.pin.resetMap.deactivateMap();
  };

  var onSubmitError = function (errorMessage) {
    window.utils.renderErrorMessage(errorMessage);
  };

  // window.backend.upload(onSubmitSuccess, onSubmitError);

  window.utils.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(window.utils.form);
    adressInput.disabled = false;
    window.backend.upload(onSubmitSuccess, onSubmitError, formData);
  });

  window.setFormData = {
    setMinValue: function () {
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
    },
    addDisabledCapacity: function (data0, data1, data2, data3) {
      capacity.options[0].disabled = data0;
      capacity.options[1].disabled = data1;
      capacity.options[2].disabled = data2;
      capacity.options[3].disabled = data3;

      for (var i = 0; i < capacity.options.length; i++) {
        if (capacity.options[i].disabled === false) {
          capacity.options[i].selected = true;
        }
      }
    },
    fillAddress: function () {
      adressInput.value = (window.utils.mapPinMain.offsetTop + window.pin.SIZE.HEIGHT) + ', ' + (window.utils.mapPinMain.offsetLeft + window.pin.SIZE.WIDTH / 2);
      adressInput.disabled = true;
    }
  };

  window.setFormData.fillAddress();
})();
