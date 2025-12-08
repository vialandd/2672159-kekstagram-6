const body = document.body;
const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const commentField = form.querySelector('.text__description');
const hashtagField = form.querySelector('.text__hashtags');

let pristine;

const onFileInputChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCancelButtonClick = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const resetForm = () => {
  form.reset();
  fileInput.value = '';

  if (pristine) {
    pristine.reset();
  }
};

const onFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.matches('.text__description, .text__hashtags')) {
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    resetForm();
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    form.submit();
  }
};

const initForm = (validationModule, scaleEffectModule) => {
  pristine = validationModule.initValidation(form);

  if (scaleEffectModule) {
    scaleEffectModule.initScaleEffect();
  }

  fileInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  commentField.addEventListener('keydown', onFieldKeydown);
  hashtagField.addEventListener('keydown', onFieldKeydown);
  form.addEventListener('submit', onFormSubmit);
};

export { initForm };
