import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

const renderThumbnails = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const img = pictureElement.querySelector('.picture__img');
    img.src = picture.url;
    img.alt = picture.description;

    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    pictureElement.addEventListener('click', () => {
      openBigPicture(picture);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

const clearThumbnails = () => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.remove();
  });
};

export { renderThumbnails, clearThumbnails };
