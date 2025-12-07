import { generatePhotos } from './data.js';

const photos = generatePhotos();

export { photos };


import { pictures } from './mock-data.js';
import { renderThumbnails } from './thumbnails.js';
import './big-picture.js';

renderThumbnails(pictures);
