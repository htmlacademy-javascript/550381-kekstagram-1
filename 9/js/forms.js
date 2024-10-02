import { openModal, closeModal } from './simple-modal.js';
import { isEscapeKey } from './utils.js';
import { onClickRadio } from './sliders.js';

const HASHTAG_SINTAX_ERROR_TEXT = 'Хэштег должен начинаться с #, не должен содержать спецсимволы.';
const HASHTAG_LENGTH_ERROR_TEXT = 'Длина хэштега должна быть от 1 до 20 символов.';
const HASHTAG_UNIQUE_ERROR_TEXT = 'Хэштеги не должны повторяться.';

const effectsRadio = document.querySelectorAll('.effects__radio');
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadClose = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const uploadSubmit = uploadForm.querySelector('#upload-submit');


effectsRadio.forEach((radio) => {
  radio.addEventListener('click', onClickRadio);
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

const hasUniqueHashtag = (value) => {
  const tags = getSplitHashtag(value);
  const lowerCaseHashtags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};


const hasValidatedHashtag = (value) => {
  const tags = getSplitHashtag(value);
  return tags.every((tag) => validHashtag.test(tag));
};

const hasValidatedLengthHashtag = (value) => {
  const tags = getSplitHashtag(value);
  return tags.every((tag) => tag.length >= 1 && tag.length <= 20);
};


pristine.addValidator(
  hashtagField,
  hasUniqueHashtag,
  HASHTAG_UNIQUE_ERROR_TEXT
);


pristine.addValidator(
  hashtagField,
  hasValidatedHashtag,
  HASHTAG_SINTAX_ERROR_TEXT
);

pristine.addValidator(
  hashtagField,
  hasValidatedLengthHashtag,
  HASHTAG_LENGTH_ERROR_TEXT
);


const isValidForm = () => {
  const isValid = pristine.validate();
  if (!isValid) {
    uploadSubmit.disabled = true;
  } else {
    uploadSubmit.disabled = false;
  }
};


const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

uploadInput.addEventListener('change', openModalForm);
uploadClose.addEventListener('click', closeModalForm);
uploadForm.addEventListener('change', isValidForm);
uploadForm.addEventListener('submit', onFormSubmit);
