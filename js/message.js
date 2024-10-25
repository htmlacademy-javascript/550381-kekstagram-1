import { onDocumentEscapeKeydown } from './forms.js';
import {isEscapeKey} from './utils.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const succesTemplate = document.querySelector('#success').content.querySelector('.success');

const closeSuccessMessage = () => {
  document.querySelector('.success').remove();
  document.removeEventListener('keydown', onDocumentSuccessEscapeKeydown);
};

const closeErrorMessage = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onDocumentErrorEscapeKeydown);
  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

function onDocumentSuccessEscapeKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
}

function onDocumentErrorEscapeKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
}

const showErrorMessage = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
  const errorButton = document.querySelector('.error__button');

  document.addEventListener('keydown', onDocumentErrorEscapeKeydown);
  errorButton.addEventListener('click', closeErrorMessage);
  errorElement.addEventListener('click', (evt) => {
    const element = document.querySelector('.error__inner');
    if (element && element !== evt.target) {
      closeErrorMessage();
    }
  });
};

const showSuccessMessage = () => {
  const successElement = succesTemplate.cloneNode(true);
  document.body.append(successElement);

  const successButton = document.querySelector('.success__button');

  document.addEventListener('keydown', onDocumentSuccessEscapeKeydown);
  successButton.addEventListener('click', closeSuccessMessage);
  successElement.addEventListener('click', (evt) => {
    const element = document.querySelector('.success__inner');
    if (element && element !== evt.target) {
      closeSuccessMessage();
    }
  });
};

export {showErrorMessage, showSuccessMessage};
