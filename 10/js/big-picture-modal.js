import { isEscapeKey, isEnterKey } from './utils.js';
import { openModal, closeModal } from './simple-modal.js';
import {renderBigPicture, createComment, bigPictureModal} from './big-picture.js';

const commentsList = bigPictureModal.querySelector('.social__comments');
const socialCommentCount = bigPictureModal.querySelector('.social__comment-count');
const socialCommentLoader = bigPictureModal.querySelector('.comments-loader');
let comments = [];
let commentCount = 0;
const COMMENTS_PORTION = 5;


const renderComments = () => {
  commentCount += COMMENTS_PORTION;

  if (commentCount >= comments.length) {
    socialCommentLoader.classList.add('hidden');
    commentCount = comments.length;
  } else {
    socialCommentLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentCount; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentsList.innerHTML = '';
  commentsList.append(fragment);
  socialCommentCount.innerHTML = `${commentCount} из <span class="comments-count">${comments.length}</span> комментариев`;
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

function hideBigPictureModal () {
  closeModal(bigPictureModal);
  document.removeEventListener('keydown', onDocumentEscapeKeydown);
}

const showBigPictureModal = (picture) => {
  openModal(bigPictureModal);

  renderBigPicture(picture);
  comments = picture.comments;
  commentCount = 0;
  renderComments();

  document.addEventListener('keydown', onDocumentEscapeKeydown);
};

bigPictureModal.querySelector('.big-picture__cancel').addEventListener('click', hideBigPictureModal);

bigPictureModal.querySelector('.big-picture__cancel').addEventListener('keydown', onDocumentEnterKeydown);

socialCommentLoader.addEventListener('click', renderComments);

socialCommentLoader.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    renderComments();
  }
});


export {showBigPictureModal};
