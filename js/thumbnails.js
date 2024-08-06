const picturesBlock = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content;
const picturesFragment = document.createDocumentFragment();


const createPicture = ({url, description, likes, comments}) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderThumbnails = (pictures) => {
  pictures.forEach((picture) => {
    const pictureElement = createPicture(picture);
    picturesFragment.appendChild(pictureElement);
  });
  picturesBlock.appendChild(picturesFragment);
};

export {renderThumbnails};
