import {getRandomInteger, getRandomArrayElement} from './utils.js';

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

const MINLIKESCOUNT = 15;
const MAXLIKESCOUNT = 200;
const MINCOMMENTCOUNT = 3;
const MAXCOMMENTCOUNT = 15;
const STARTCOMMENTID = 100;

const createCommentObject = (commentIndex) => ({
  id: STARTCOMMENTID + commentIndex,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' '),
  name: getRandomArrayElement(NAMES)
});


const createImageObject = (dataIndex) => ({
  id: dataIndex + 1,
  url: `photos/${dataIndex + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MINLIKESCOUNT, MAXLIKESCOUNT),
  comments: Array.from({length: getRandomInteger(MINCOMMENTCOUNT, MAXCOMMENTCOUNT)}, (_, index) => createCommentObject(index))
});

const createData = () => Array.from({length: IMAGECOUNT}, (_, index) => createImageObject(index));

export {createData};
