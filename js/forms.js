import { openModal, closeModal } from './simple-modal.js';
import { isEscapeKey } from './utils.js';

const HASHTAG_ERROR_TEXT = 'Хэштег должен начинаться с #, не должен содержать спецсимволы, длина от 1 до 20 символов и не повторяться.';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadClose = uploadOverlay.querySelector('.img-upload__cancel');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const uploadSubmit = uploadForm.querySelector('#upload-submit');


const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

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

const hasUniqueHashtag = (tags) => {
  const lowerCaseHashtags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};


const hasValidatedHashtag = (value) => {
  const tags = value.split(' ')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length);
  return hasUniqueHashtag(tags) && tags.every((tag) => validHashtag.test(tag));
};


pristine.addValidator(
  hashtagField,
  hasValidatedHashtag,
  HASHTAG_ERROR_TEXT);


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
