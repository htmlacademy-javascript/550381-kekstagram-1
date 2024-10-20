import { openModal, closeModal } from './simple-modal.js';
import { isEscapeKey, ScaleParams } from './utils.js';
import { onClickRadio } from './sliders.js';
import { showFilters } from './filters.js';

const ErrorHashtagText = {
  TOO_LONG: 'Длина хэштега должна быть от 1 до 20 символов.',
  WRONG_SYNTAX: 'Хэштег должен начинаться с #, не должен содержать спецсимволы.',
  DUPLICATE: 'Хэштеги не должны повторяться.'
};

const effectsRadio = document.querySelectorAll('.effects__radio');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
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

const openModalForm = () => {
  openModal(uploadOverlay);
  scaleControlValue.value = `${ScaleParams.MAX_SCALE}%`;
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

const closeModalForm = () => {
  uploadForm.reset();
  pristine.reset();
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
    default:
      return ErrorHashtagText.WRONG_SYNTAX;
  }
};

function hasValidatedHashtag (value) {
  const tags = getSplitHashtag(value);
  return hasUniqueHashtag(tags) && hasValidatedLengthHashtag(tags) && tags.every((tag) => validHashtag.test(tag));
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
      showFilters();
    }
  });
};

uploadInput.addEventListener('change', openModalForm);
uploadClose.addEventListener('click', closeModalForm);
uploadForm.addEventListener('change', isValidForm);

export { onFormSubmit, closeModalForm };
