'use strict';

(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var templatePopup = document.querySelector('#card').content.querySelector('.map__card');
  var featuresList = templatePopup.querySelector('.popup__features');
  var feature = templatePopup.querySelectorAll('.popup__feature');
  var photoList = templatePopup.querySelector('.popup__photos');
  var photoElement = photoList.querySelector('.popup__photo');

  var featuresMap = {
    'wifi': 'popup__feature--wifi',
    'dishwasher': 'popup__feature--dishwasher',
    'parking': 'popup__feature--parking',
    'washer': 'popup__feature--washer',
    'elevator': 'popup__feature--elevator',
    'conditioner': 'popup__feature--conditioner'
  };

  feature.forEach(function (item) {
    featuresList.removeChild(item);
  });

  photoList.removeChild(photoElement);

  var renderFeatureElement = function (featuresObject) {
    var objects = document.createDocumentFragment();
    featuresObject.offer.features.forEach(function (item) {
      var newElement = document.createElement('li');
      newElement.classList = 'popup__feature';
      newElement.classList.add(featuresMap[item]);
      objects.appendChild(newElement);
    });

    return objects;
  };

  var renderPhotoElement = function (photoObject) {
    var objects = document.createDocumentFragment();
    photoObject.offer.photos.forEach(function (item) {
      var photoCard = document.createElement('img');
      photoCard.classList = 'popup__photo';
      photoCard.setAttribute('width', '45px');
      photoCard.setAttribute('height', '40px');
      photoCard.src = item;
      photoCard.alt = 'Фотография жилья';
      objects.appendChild(photoCard);
    });

    return objects;
  };

  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var renderPopup = function (popup) {
    var popupEl = templatePopup.cloneNode(true);
    var type = popupEl.querySelector('.popup__type');
    var popupClose = popupEl.querySelector('.popup__close');


    var removeEvent = function () {
      document.removeEventListener('keydown', isEscPopup);
    };

    var isEscPopup = function (evt) {
      if (evt.keyCode === window.utils.escCode) {
        popupEl.remove();
        removeEvent();
      }
    };

    popupClose.addEventListener('click', function () {
      popupEl.remove();
    });
    document.removeEventListener('click', isEscPopup);

    if (popup.author.avatar === '') {
      popupEl.querySelector('.popup__avatar').classList.add('hidden');
    }
    popupEl.querySelector('.popup__avatar').src = popup.author.avatar;

    if (popup.offer.title === '') {
      popupEl.querySelector('.popup__title').classList.add('hidden');
    }
    popupEl.querySelector('.popup__title').textContent = popup.offer.title;

    if (popup.offer.address === '') {
      popupEl.querySelector('.popup__text--address').classList.add('hidden');
    }
    popupEl.querySelector('.popup__text--address').textContent = popup.offer.address;

    if (popup.offer.price === 0 || popup.offer.price === '') {
      popupEl.querySelector('.popup__text--price').classList.add('hidden');
    }
    popupEl.querySelector('.popup__text--price').textContent = popup.offer.price + '₽/ночь';

    if (popup.offer.type === '') {
      popupEl.querySelector('.popup__type').classList.add('hidden');
    }
    type.textContent = typesMap[popup.offer.type];

    if (popup.offer.rooms === 0 && popup.offer.guests === 0) {
      popupEl.querySelector('.popup__text--capacity').classList.add('hidden');
    }
    popupEl.querySelector('.popup__text--capacity').textContent = popup.offer.rooms + ' комнаты для ' + popup.offer.guests + ' гостей';

    if (popup.offer.checkin === '0:00' && popup.offer.checkout === '0:00') {
      popupEl.querySelector('.popup__text--time').classList.add('hidden');
    }
    popupEl.querySelector('.popup__text--time').textContent = 'Заезд после ' + popup.offer.checkin + ', выезд до ' + popup.offer.checkout;

    if (popup.offer.features.length === 0) {
      popupEl.querySelector('.popup__features').classList.add('hidden');
    }
    popupEl.querySelector('.popup__features').appendChild(renderFeatureElement(popup));

    if (popup.offer.description === '') {
      popupEl.querySelector('.popup__description').classList.add('hidden');
    }
    popupEl.querySelector('.popup__description').textContent = popup.offer.description;

    if (popup.offer.photos.length === 0) {
      popupEl.querySelector('.popup__photos').classList.add('hidden');
    }
    popupEl.querySelector('.popup__photos').appendChild(renderPhotoElement(popup));

    mapFiltersContainer.insertAdjacentElement('beforebegin', popupEl);

    document.addEventListener('keydown', isEscPopup);

    return popupEl;
  };

  window.card = {
    renderPopup: renderPopup
  };

})();
