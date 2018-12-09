'use strict';

(function () {
  var MIN_PRICES = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

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

  window.utils.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
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
    },
    fillAddress: function () {
      adressInput.value = (window.utils.mapPinMain.offsetTop + window.pin.MAIN_PIN.HEIGHT) + ', ' + (window.utils.mapPinMain.offsetLeft + window.pin.MAIN_PIN.WIDTH / 2);
      adressInput.disabled = true;
    }
  };

  window.setFormData.fillAddress();
})();
