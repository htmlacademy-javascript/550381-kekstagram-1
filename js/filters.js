const PICTURES_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const imgFilters = document.querySelector('.img-filters');

let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (a, b) => b.comments.length - a.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return pictures.slice().sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return pictures.slice().sort(sortByComments);
    default:
      return pictures;
  }
};
//   if (!evt.target.classList.contains('img-filters__button')) {
//     return;
//   }

//   const clickedFilter = evt.target;
//   if (clickedFilter.id === currentFilter) {
//     return;
//   }

//   imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
//   clickedFilter.classList.add('img-filters__button--active');

//   currentFilter = clickedFilter.id;
//   const debouncedRenderGalery = debounce(renderGalery);
//   debouncedRenderGalery(getFilteredPictures());
// });

const setOnFilterClick = (callback) => {
  imgFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedFilter = evt.target;
    if (clickedFilter.id === currentFilter) {
      return;
    }

    imgFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    clickedFilter.classList.add('img-filters__button--active');

    currentFilter = clickedFilter.id;
    callback(getFilteredPictures());
  });
};

const init = (loadedPictures, callback) => {
  pictures = [...loadedPictures];
  imgFilters.classList.remove('img-filters--inactive');
  setOnFilterClick(callback);
};


export { init, getFilteredPictures };
