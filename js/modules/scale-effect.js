const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
};

const scaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effects__level');
const effectLevelValue = document.querySelector('.effects__level-value');
const effectLevelSlider = document.querySelector('.effects__level-slider');

let currentScale = SCALE_DEFAULT;
let currentEffect = 'none';
let slider = null;

const updateScale = () => {
  scaleControl.value = `${currentScale}%`;
  const scaleValue = currentScale / 100;
  imagePreview.style.transform = `scale(${scaleValue})`;
};

const onScaleSmallerClick = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

const onScaleBiggerClick = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale();
};

const createSlider = () => {
  if (slider) {
    slider.destroy();
  }

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    imagePreview.style.filter = 'none';
    return;
  }

  effectLevel.classList.remove('hidden');

  const { min, max, step, start } = EFFECTS[currentEffect];

  slider = noUiSlider.create(effectLevelSlider, {
    range: {
      min,
      max
    },
    start,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
      from: (value) => parseFloat(value)
    }
  });

  slider.on('update', () => {
    const sliderValue = slider.get();
    effectLevelValue.value = sliderValue;
    applyEffect(sliderValue);
  });
};

const applyEffect = (value) => {
  const { filter, unit } = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
  } else {
    imagePreview.style.filter = `${filter}(${value}${unit})`;
  }
};

const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;
    createSlider();
  }
};

const resetEffects = () => {
  currentEffect = 'none';
  const noneEffect = effectsList.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }
  createSlider();
};

const initScaleEffect = () => {
  updateScale();

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);

  effectsList.addEventListener('change', onEffectChange);

  createSlider();
};

const destroyScaleEffect = () => {
  scaleSmaller.removeEventListener('click', onScaleSmallerClick);
  scaleBigger.removeEventListener('click', onScaleBiggerClick);
  effectsList.removeEventListener('change', onEffectChange);

  if (slider) {
    slider.destroy();
    slider = null;
  }

  resetScale();
  resetEffects();
};

export { initScaleEffect, destroyScaleEffect, resetScale, resetEffects };
