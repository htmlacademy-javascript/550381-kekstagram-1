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

// функция с генератором для получения целого положительного уникального рандомного числа в заданном диапозоне
const createIndividualRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// функция для возвращения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateImageId = createIndividualRandomId(1, 25);
const generateImageUrlNumber = createIndividualRandomId(1, 25);
const generateCommentId = createIndividualRandomId(100, 180);


const createCommentObject = () => ({
  id: generateCommentId(),
  avatar: 'img/avatar-' + String(getRandomInteger(1, 6)) + '.svg',
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});


const createImageObject = () => ({
  id: generateImageId(),
  url: 'photos/' + String(generateImageUrlNumber()) + '.jpg',
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: createCommentObject()
});

const data = Array.from({length: 25}, createImageObject);
console.log(data);
