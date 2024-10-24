import { openModal, closeModal } from './simple-modal.js';
import { isEscapeKey, ScaleParams } from './utils.js';
import { onClickRadio, resetScale, setDefaultSlider } from './sliders.js';

const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;
const ErrorHashtagText = {
  TOO_LONG: 'Длина хэштега должна быть от 1 до 20 символов.',
  WRONG_SYNTAX: 'Хэштег должен начинаться с #, не должен содержать спецсимволы.',
  DUPLICATE: 'Хэштеги не должны повторяться.',
  MAX_COUNT:'Нельзя использовать больше пяти хештегов'
};

const effectsRadio = document.querySelectorAll('.effects__radio');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const previewImgUpload = document.querySelector('.img-upload__preview img');
const previewEffects = document.querySelectorAll('.effects__preview');
const uploadClose = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const uploadSubmit = uploadForm.querySelector('#upload-submit');
const scaleControlValue = document.querySelector('.scale__control--value');


effectsRadio.forEach((radio) => {
  radio.addEventListener('change', onClickRadio);
});

// eslint-disable-next-line no-misleading-character-class
const validHashtag = /^#[a-zа-яё0-9]+$/i;


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text-error'
});

const setPreviewPicture = (container) => {
  const file = container.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (!matches) {
    return;
  }

  previewImgUpload.src = URL.createObjectURL(file);
  previewEffects
    .forEach((item) => {
      item.style.backgroundImage = `url(${previewImgUpload.src})`;
    });
};

const openModalForm = () => {
  openModal(uploadOverlay);
  setPreviewPicture(uploadInput);
  scaleControlValue.value = `${ScaleParams.MAX_SCALE}%`;
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

const closeModalForm = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  setDefaultSlider();
  closeModal(uploadOverlay);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === commentField || document.activeElement === hashtagField;


function onDocumentEscapeKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModalForm();
  }
}

const getSplitHashtag = (value) => value
  .split(' ')
  .map((tag) => tag.trim())
  .filter((tag) => tag.length);

const hasUniqueHashtag = (tags) => {
  const lowerCaseHashtags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};


const hasValidatedLengthHashtag = (tags) => tags.every((tag) => tag.length >= 1 && tag.length <= 20);

const getErrorText = () => {
  const tags = getSplitHashtag(hashtagField.value);
  const flag = false;
  switch (flag) {
    case flag === !hasUniqueHashtag(tags):
      return ErrorHashtagText.DUPLICATE;
    case flag === !hasValidatedLengthHashtag(tags):
      return ErrorHashtagText.TOO_LONG;
    case flag === tags.length > MAX_HASHTAG_COUNT:
      return ErrorHashtagText.MAX_COUNT;
    default:
      return ErrorHashtagText.WRONG_SYNTAX;
  }
};

function hasValidatedHashtag (value) {
  const tags = getSplitHashtag(value);
  return hasUniqueHashtag(tags) && hasValidatedLengthHashtag(tags) && tags.every((tag) => validHashtag.test(tag) && tags.length <= MAX_HASHTAG_COUNT);
}

pristine.addValidator(
  hashtagField,
  hasValidatedHashtag,
  () => getErrorText()
);


const isValidForm = () => {
  const isValid = pristine.validate();
  if (!isValid) {
    uploadSubmit.disabled = true;
    return isValid;
  } else {
    uploadSubmit.disabled = false;
    return isValid;
  }
};


const onFormSubmit = (cb) => {
  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (isValidForm()) {
      uploadSubmit.disabled = true;
      await cb(new FormData(evt.target));
      uploadSubmit.disabled = false;
    }
  });
};

uploadInput.addEventListener('change', openModalForm);
uploadClose.addEventListener('click', closeModalForm);
uploadForm.addEventListener('change', isValidForm);

export { onFormSubmit, closeModalForm, onDocumentEscapeKeydown };
