import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const body = document.body;
const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const commentField = form.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

let pristine;
let scaleEffectModule;

const resetForm = () => {
  form.reset();
  fileInput.value = '';

  if (pristine) {
    pristine.reset();
  }

  if (scaleEffectModule && scaleEffectModule.resetScale && scaleEffectModule.resetEffects) {
    scaleEffectModule.resetScale();
    scaleEffectModule.resetEffects();
  }
};

const onFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !evt.target.matches('.text__description, .text__hashtags')) {
    closeForm();
  }
};

const onFileInputChange = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

const onCancelButtonClick = () => {
  closeForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  blockSubmitButton();

  try {
    const formData = new FormData(evt.target);
    await sendData(formData);
    showSuccessMessage();
    closeForm();
  }
  catch {
    showErrorMessage();
  }
  finally {
    unblockSubmitButton();
  }
};

const initForm = (validationModule, scaleModule) => {
  pristine = validationModule.initValidation(form);
  scaleEffectModule = scaleModule;

  if (scaleEffectModule && scaleEffectModule.initScaleEffect) {
    scaleEffectModule.initScaleEffect();
  }

  fileInput.addEventListener('change', onFileInputChange);
  cancelButton.addEventListener('click', onCancelButtonClick);
  commentField.addEventListener('keydown', onFieldKeydown);
  hashtagField.addEventListener('keydown', onFieldKeydown);
  form.addEventListener('submit', onFormSubmit);
};

export { initForm, closeForm };
