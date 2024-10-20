const picturesBlock = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();


const createThunbnail = ({id, url, description, likes, comments}) => {
  const pictureElement = picturesTemplate.cloneNode(true);
  pictureElement.dataset.thumbnailId = id;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const renderThumbnails = (pictures) => {
  picturesBlock.querySelectorAll('.picture').forEach((item) => item.remove());
  pictures.forEach((picture) => {
    const pictureElement = createThunbnail(picture);
    picturesFragment.appendChild(pictureElement);
  });
  picturesBlock.appendChild(picturesFragment);
};

export {renderThumbnails};
