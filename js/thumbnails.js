const picturesBlock = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();


const createPicture = (picture) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  console.log(pictureElement.querySelector('.picture__img').src = picture.url);
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

const renderThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    picturesFragment.appendChild(pictureElement);
  });
  picturesBlock.appendChild(picturesFragment);
  console.log(pictureElement);
};

export {renderThumbnails};
