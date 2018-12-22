'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarLoader = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var loadAvatar = function () {
    var file = avatarLoader.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var imageLoader = document.querySelector('#images');
  var previewImages = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');

  var createImgBlock = function (url) {
    var element = previewImages.cloneNode(true);
    var image = document.createElement('img');
    image.src = url;
    image.width = '70';
    image.height = '70';
    image.style = 'border-radius: 5px;';
    image.classList = 'ad-form__photo-image';
    element.appendChild(image);
    photoContainer.appendChild(element);
  };

  var loadPhoto = function () {
    previewImages.remove();
    var file = imageLoader.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        createImgBlock(reader.result);
      });
    }

    reader.readAsDataURL(file);
  };

  var resetLoaders = function () {
    var photos = document.querySelectorAll('.ad-form__photo');
    previewAvatar.src = 'img/muffin-grey.svg';
    for (var i = 0; i < photos.length; i++) {
      photos[i].remove();
    }
    photoContainer.appendChild(previewImages);
  };

  var activateLoaders = function () {
    avatarLoader.addEventListener('change', loadAvatar);
    imageLoader.addEventListener('change', loadPhoto);
  };

  var deactivateLoaders = function () {
    avatarLoader.removeEventListener('change', loadAvatar);
    imageLoader.removeEventListener('change', loadPhoto);
    resetLoaders();
  };

  window.avatar = {
    activate: activateLoaders,
    reset: deactivateLoaders
  };
})();
