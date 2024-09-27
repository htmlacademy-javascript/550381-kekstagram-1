import { HTMLBODY } from './utils.js';

const openModal = (element) => {
  element.classList.remove('hidden');
  HTMLBODY.classList.add('modal-open');
};

const closeModal = (element) => {
  element.classList.add('hidden');
  HTMLBODY.classList.remove('modal-open');
};

export { openModal, closeModal };
