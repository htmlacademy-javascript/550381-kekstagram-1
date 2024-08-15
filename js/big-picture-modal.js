import { isEscapeKey } from './utils.js';
import { isEnterKey } from './utils.js';

const bigPictureModal = document.querySelector('.big-picture');
const socialCommentCount = bigPictureModal.querySelector('.social__comment-count');
const socialCommentLoader = bigPictureModal.querySelector('.comments-loader');
const body = document.querySelector('body');

const renderBigPicture = (picture) => {
  bigPictureModal.querySelector('.big-picture__img img').src = picture.url;
  bigPictureModal.querySelector('.likes-count').textContent = picture.likes;
  bigPictureModal.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureModal.querySelector('.social__caption').textContent = picture.description;
};


const renderComments = (comments) => {
  const commentsList = bigPictureModal.querySelector('.social__comments');
  const commentElement = commentsList.querySelector('.social__comment');

  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    const element = commentElement.cloneNode(true);
    element.querySelector('.social__picture').src = comment.avatar;
    element.querySelector('.social__picture').alt = comment.name;
    element.querySelector('.social__text').textContent = comment.message;
    commentsList.append(element);
  });
};

const onDocumentEscapeKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPictureModal();
  }
};

const onDocumentEnterKeydown = (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    hideBigPictureModal();
  }
};

const hideBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  socialCommentLoader.classList.remove('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentEscapeKeydown);
};

const showBigPictureModal = (picture) => {
  bigPictureModal.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  socialCommentLoader.classList.add('hidden');
  body.classList.add('modal-open');

  renderBigPicture(picture);

  renderComments(picture.comments);

  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

bigPictureModal.querySelector('.big-picture__cancel').addEventListener('click', hideBigPictureModal);

bigPictureModal.querySelector('.big-picture__cancel').addEventListener('keydown', onDocumentEnterKeydown);


export {showBigPictureModal};
