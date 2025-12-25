import { renderThumbnails } from './thumbnails.js';
import { showFilters, setFilters } from './filters.js';
import { getData } from './api.js';

import './big-picture.js';

import { initForm } from './modules/form.js';
import { initValidation } from './modules/validation.js';
import { initScaleEffect } from './modules/scale-effect.js';
import { initPhotos } from './modules/photos.js';

import '../vendor/nouislider/nouislider.js';

document.addEventListener('DOMContentLoaded', () => {
  initForm({ initValidation }, { initScaleEffect });
  initPhotos();
});

getData((pictures) => {
  renderThumbnails(pictures);
  showFilters();
  setFilters(pictures);
});
