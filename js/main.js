import { generatePhotos } from './data.js';

const photos = generatePhotos();

export { photos };


import { pictures } from './mock-data.js';
import { renderThumbnails } from './thumbnails.js';
import './big-picture.js';

renderThumbnails(pictures);

import { initForm } from './modules/form.js';
import { initValidation } from './modules/validation.js';

document.addEventListener('DOMContentLoaded', () => {
  initForm({ initValidation });
});
