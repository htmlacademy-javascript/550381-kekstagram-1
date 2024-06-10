// Функция для проверки, является ли строка палиндромом
const isPalindrom = (text) => {
  const newText = text.toUpperCase().replaceAll(' ', '');

  for (let i = 0; i < (newText.length / 2); i++) {
    if (newText[i] !== newText.at(-(i + 1))) {
      return false;
    }
  }

  return true;
};

// console.log(isPalindrom('топот'));
// console.log(isPalindrom('ДовОд'));
// console.log(isPalindrom('Кекс'));
// console.log(isPalindrom('Лёша на полке клопа нашёл '));


// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN:
const getNumberForString = (string) => {
  const newString = !isNaN(string) ? String(string) : string.replaceAll(' ', '');
  let result = '';

  for (let i = 0; i < newString.length; i++) {
    if (!isNaN(+newString[i])) {
      result += newString[i];
    }
  }
  if (result) {
    return +result;
  }

  return NaN;
};

// console.log(getNumberForString('2023 год'));
// console.log(getNumberForString('ECMAScript 2022'));
// console.log(getNumberForString('1 кефир, 0.5 батона'));
// console.log(getNumberForString('агент 007'));
// console.log(getNumberForString('а я томат'));
// console.log(getNumberForString(2023));
// console.log(getNumberForString(-1));
// console.log(getNumberForString(1.5));

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины
const getUpdatedString = (string, lengthString, subString) => {
  if (string.length >= lengthString) {
    return string;
  }
  let newString = '';

  while (newString.length !== lengthString - string.length) {
    let newSub = subString.slice(0, lengthString - (newString.length + string.length));
    newString = newSub + newString;
  }

  return newString + string;
};

// console.log(getUpdatedString('1', 2, '0'));
// console.log(getUpdatedString('1', 4, '0'));
// console.log(getUpdatedString('q', 4, 'werty'));
// console.log(getUpdatedString('q', 4, 'we'));
// console.log(getUpdatedString('qwerty', 4, '0'));


// Функция для проверки длины строки
const isValidLengthString = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }

  return false;
};

// console.log(isValidLengthString('проверяемая строка', 20));
// console.log(isValidLengthString('проверяемая строка', 18));
// console.log(isValidLengthString('проверяемая строка', 10));
