const bigPictureModal = document.querySelector('.big-picture');


const renderBigPicture = (picture) => {
  bigPictureModal.querySelector('.big-picture__img img').src = picture.url;
  bigPictureModal.querySelector('.likes-count').textContent = picture.likes;
  bigPictureModal.querySelector('.social__caption').textContent = picture.description;
};

const createComment = (comment) => {
  const commentElement = bigPictureModal.querySelector('.social__comment');


  const element = commentElement.cloneNode(true);
  element.querySelector('.social__picture').src = comment.avatar;
  element.querySelector('.social__picture').alt = comment.name;
  element.querySelector('.social__text').textContent = comment.message;
  return element;

};


export {renderBigPicture, createComment, bigPictureModal};
