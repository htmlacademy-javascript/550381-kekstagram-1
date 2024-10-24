import { ScaleParams } from './utils.js';

const SliderEffects = {
  none:
  {
    name: 'none',
    prop: '',
    min: 0,
    max: 100,
    step: 1,
  },

  chrome:
  {
    name: 'chrome',
    prop: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  sepia:
  {
    name: 'sepia',
    prop: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },

  marvin:
  {
    name: 'marvin',
    prop: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },

  phobos:
  {
    name: 'phobos',
    prop: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },

  heat:
  {
    name: 'heat',
    prop: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

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

const resetScale = () => {
  imgPreview.style.transform = 'scale(1)';
  scaleControlValue.value = `${ScaleParams.MAX_SCALE}%`;
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


const defaultSlider = SliderEffects.none;
const setDefaultSlider = () => {
  sliderElement.classList.add('hidden');
  sliderElementWrapper.classList.add('hidden');
  imgPreview.style.removeProperty('filter');
  sliderValue.value = defaultSlider.prop;
  imgPreview.className = `effects__preview--${defaultSlider.name}`;
};

const setParamsUpdateSlider = (effect) => {
  if (effect === defaultSlider.name) {
    setDefaultSlider();
    return;
  }

  sliderElement.classList.remove('hidden');
  sliderElementWrapper.classList.remove('hidden');

  sliderValue.value = SliderEffects[effect].prop;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: SliderEffects[effect].min,
      max: SliderEffects[effect].max,
    },
    start: SliderEffects[effect].max,
    step: SliderEffects[effect].step
  });
};

const onClickRadio = (evt) => {
  const effect = evt.target.value;
  imgPreview.className = `effects__preview--${effect}`;
  setParamsUpdateSlider(effect);
};


sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  sliderValue.value = value;

  const effect = imgPreview.className.split('--')[1];
  switch (effect) {
    case 'chrome':
      imgPreview.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      imgPreview.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      imgPreview.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      imgPreview.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      imgPreview.style.filter = `brightness(${value})`;
      break;
  }
});

export {onClickRadio, ScaleParams, resetScale, setDefaultSlider };
