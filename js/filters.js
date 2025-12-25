import { debounce, getRandomInteger } from './util.js';
import { renderThumbnails, clearThumbnails } from './thumbnails.js';

const FILTER_RANDOM_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filterForm = filtersContainer.querySelector('.img-filters__form');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

const getDefaultPictures = (pictures) => pictures.slice();

const getRandomPictures = (pictures) => {
  const result = [];
  const usedIndexes = new Set();

  while (result.length < FILTER_RANDOM_COUNT && result.length < pictures.length) {
    const index = getRandomInteger(0, pictures.length - 1);

    if (!usedIndexes.has(index)) {
      usedIndexes.add(index);
      result.push(pictures[index]);
    }
  }

  return result;
};

const getDiscussedPictures = (pictures) =>
  pictures
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);

const renderWithDebounce = debounce((pictures) => {
  clearThumbnails();
  renderThumbnails(pictures);
}, RERENDER_DELAY);

const setFilters = (pictures) => {
  filterForm.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    filterButtons.forEach((button) => {
      button.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add('img-filters__button--active');

    let filteredPictures = [];

    switch (evt.target.id) {
      case 'filter-default':
        filteredPictures = getDefaultPictures(pictures);
        break;
      case 'filter-random':
        filteredPictures = getRandomPictures(pictures);
        break;
      case 'filter-discussed':
        filteredPictures = getDiscussedPictures(pictures);
        break;
      default:
        filteredPictures = getDefaultPictures(pictures);
    }

    renderWithDebounce(filteredPictures);
  });
};

export { showFilters, setFilters };
