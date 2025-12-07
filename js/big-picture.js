const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');

const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

let currentComments = [];
let shownComments = 0;
const COMMENTS_PER_STEP = 5;

function createComment(comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  li.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return li;
}

function renderComments() {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(shownComments, shownComments + COMMENTS_PER_STEP);

  nextComments.forEach((comment) => fragment.appendChild(createComment(comment)));

  commentsList.appendChild(fragment);

  shownComments += nextComments.length;

  commentCountBlock.textContent = `${shownComments} из ${currentComments.length} комментариев`;

  if (shownComments >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  }
}

export function openBigPicture(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  commentsList.innerHTML = '';

  currentComments = photo.comments;
  shownComments = 0;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscPress);
}

export function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscPress);
}

function onEscPress(evt) {
  if (evt.key === 'Escape') {
    closeBigPicture();
  }
}

commentsLoader.addEventListener('click', renderComments);
closeButton.addEventListener('click', closeBigPicture);
