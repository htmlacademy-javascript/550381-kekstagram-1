import { HTML_BODY } from './utils.js';

const openModal = (element) => {
  element.classList.remove('hidden');
  HTML_BODY.classList.add('modal-open');
};

const closeModal = (element) => {
  element.classList.add('hidden');
  HTML_BODY.classList.remove('modal-open');
};

export { openModal, closeModal };
