import { renderThumbnails } from './thumbnails.js';
import { showBigPictureModal } from './big-picture-modal.js';
import { isEnterKey } from './utils.js';

const picturesBlock = document.querySelector('.pictures');


const connectThumbnailsWithBigPicture = (evt, pictures) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');
  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const picture = pictures.find((item) => item.id === +thumbnail.dataset.thumbnailId);
  showBigPictureModal(picture);
};


const onDocumentEnterKeydown = (evt, pictures) => {
  if (isEnterKey(evt)) {
    evt.preventDefault();
    connectThumbnailsWithBigPicture(evt, pictures);
  }
};


const renderGalery = (pictures) => {
  picturesBlock.addEventListener('click', (evt) => {
    connectThumbnailsWithBigPicture(evt, pictures);
  });

  document.addEventListener('keydown', (evt) => {
    onDocumentEnterKeydown(evt, pictures);
  });

  renderThumbnails(pictures);
};


export {renderGalery};
