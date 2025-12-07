const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

export const renderThumbnails = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const img = pictureElement.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};
