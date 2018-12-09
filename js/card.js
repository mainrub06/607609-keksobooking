'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var templatePopup = document.querySelector('#card').content.querySelector('.map__card');
  var featuresList = templatePopup.querySelector('.popup__features');
  var feature = templatePopup.querySelectorAll('.popup__feature');

  for (var w = 0; w < feature.length; w++) {
    featuresList.removeChild(feature[w]);
  }

  var photoList = templatePopup.querySelector('.popup__photos');
  var photoElement = photoList.querySelector('.popup__photo');

  photoList.removeChild(photoElement);

  var featuresMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  var renderFeatureElement = function (featuresObject) {
    var objects = document.createDocumentFragment();
    for (var z = 0; z < featuresObject.offer.features.length; z++) {
      var newElement = document.createElement('li');
      newElement.classList = 'popup__feature';
      newElement.classList.add(featuresMap[featuresObject.offer.features[z]]);
      objects.appendChild(newElement);
    }

    return objects;
  };

  var renderPhotoElement = function (photoObject) {
    var objects = document.createDocumentFragment();
    for (var y = 0; y < photoObject.offer.photos.length; y++) {
      var photoCard = document.createElement('img');
      photoCard.classList = 'popup__photo';
      photoCard.setAttribute('width', '45px');
      photoCard.setAttribute('height', '40px');
      photoCard.src = photoObject.offer.photos[y];
      photoCard.alt = 'Фотография жилья';
      objects.appendChild(photoCard);
    }

    return objects;
  };

  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  window.card = {
    renderPopup: function (popup) {
      var popupEl = templatePopup.cloneNode(true);
      var type = popupEl.querySelector('.popup__type');
      var popupClose = popupEl.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        popupEl.remove();
      });
      document.removeEventListener('click', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          popupEl.remove();
        }
      });

      popupEl.querySelector('.popup__avatar').src = popup.author.avatar;
      popupEl.querySelector('.popup__title').textContent = popup.offer.title;
      popupEl.querySelector('.popup__text--address').textContent = popup.offer.address;
      popupEl.querySelector('.popup__text--price').textContent = popup.offer.price + '₽/ночь';
      type.textContent = typesMap[popup.offer.type];
      popupEl.querySelector('.popup__text--capacity').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';
      popupEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;

      popupEl.querySelector('.popup__features').appendChild(renderFeatureElement(popup));

      popupEl.querySelector('.popup__description').textContent = popup.offer.description;

      popupEl.querySelector('.popup__photos').appendChild(renderPhotoElement(popup));

      mapFiltersContainer.insertAdjacentElement('beforebegin', popupEl);

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          popupEl.remove();
        }
      });

      return popupEl;
    }
  };

})();
