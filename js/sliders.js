import { ScaleParams} from './utils.js';

const sliderElementWrapper = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const scaleControlValue = document.querySelector('.scale__control--value');
const controlSmaller = document.querySelector('.scale__control--smaller');
const controlBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview img');

sliderElementWrapper.classList.add('hidden');
sliderElement.classList.add('hidden');
scaleControlValue.value = `${ScaleParams.MAX_SCALE}%`;

const onControlSmallerClick = () => {
  let value = Number(scaleControlValue.value.slice(0, -1)) - ScaleParams.STEP_SCALE;
  imgPreview.style.transform = `scale(${value / 100})`;
  if (value < ScaleParams.MIN_SCALE) {
    value = ScaleParams.MIN_SCALE;
    imgPreview.style.transform = `scale(${ScaleParams.MIN_SCALE / 100})`;
  }

  scaleControlValue.value = `${value}%`;
};


const onControlBiggerClick = () => {
  let value = Number(scaleControlValue.value.slice(0, -1)) + ScaleParams.STEP_SCALE;
  imgPreview.style.transform = `scale(${value / 100})`;
  if (value > ScaleParams.MAX_SCALE) {
    value = ScaleParams.MAX_SCALE;
    imgPreview.style.transform = `scale(${ScaleParams.MAX_SCALE / 100})`;
  }

  scaleControlValue.value = `${value}%`;
};

controlSmaller.addEventListener('click', onControlSmallerClick);
controlBigger.addEventListener('click', onControlBiggerClick);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',

  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return Number(value);
    },
  },
});

const onClickRadio = (evt) => {
  const effect = evt.target.value;
  if (effect === 'none') {
    sliderElement.classList.add('hidden');
    sliderElementWrapper.classList.add('hidden');
    imgPreview.style.removeProperty('filter');
    sliderValue.value = '';
  } else {
    sliderElement.classList.remove('hidden');
    sliderElementWrapper.classList.remove('hidden');
  }

  imgPreview.className = `effects__preview--${effect}`;

  if (effect === 'chrome') {
    sliderValue.value = 1;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (effect === 'sepia') {
    sliderValue.value = 1;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (effect === 'marvin') {
    sliderValue.value = 100;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if (effect === 'phobos') {
    sliderValue.value = 3;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 1,
    });
  } else if (effect === 'heat') {
    sliderValue.value = 3;
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 1,
    });
  }
};


sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  sliderValue.value = value;

  const effect = imgPreview.className.split('--')[1];
  if (effect === 'chrome') {
    imgPreview.style.filter = `grayscale(${value})`;
  } else if (effect === 'sepia') {
    imgPreview.style.filter = `sepia(${value})`;
  } else if (effect === 'marvin') {
    imgPreview.style.filter = `invert(${value}%)`;
  } else if (effect === 'phobos') {
    imgPreview.style.filter = `blur(${value}px)`;
  } else if (effect === 'heat') {
    imgPreview.style.filter = `brightness(${value})`;
  }
});

export {onClickRadio, ScaleParams};
