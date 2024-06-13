const IMAGECOUNT = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Иван',
  'Андрей',
  'Ангелина',
  'Марк',
  'Захарий',
  'Веньямин',
  'Слава',
  'Святослас',
  'Станислав',
  'Димитрий',
  'Тодор'
];
const DESCRIPTIONS = [
  'Моя бабушка случайно чихнула',
  'Получилась фотография',
  'Я поскользнулся на банановой кожуре',
  'Уронил фотоаппарат на кота',
  'Поймал момент',
  'А вот и солнце',
  'Мои родные',
  'А вот и я',
];

// функция для получения целого положительного рандомного числа в заданном диапозоне
const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// функция для возвращения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createCommentObject = (commentIndex) => ({
  id: 100 + commentIndex,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES)
});


const createImageObject = (dataIndex) => ({
  id: dataIndex + 1,
  url: `'photos/${dataIndex + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(3, 6)}, (_, index) => createCommentObject(index))
});

const createData = () => Array.from({length: IMAGECOUNT}, (_, index) => createImageObject(index));

export {createData};
