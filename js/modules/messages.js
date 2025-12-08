const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const hideMessage = (messageElement, clickCallback, keydownCallback) => {
  messageElement.remove();
  document.removeEventListener('click', clickCallback);
  document.removeEventListener('keydown', keydownCallback);
};

const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.appendChild(message);

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      hideMessage(message, onDocumentClick, onDocumentKeydown);
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner') && !evt.target.closest('.error__inner')) {
      hideMessage(message, onDocumentClick, onDocumentKeydown);
    }
  };

  const closeButton = message.querySelector('.success__button, .error__button');
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      hideMessage(message, onDocumentClick, onDocumentKeydown);
    });
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  showMessage(successTemplate);
};

const showErrorMessage = () => {
  showMessage(errorTemplate);
};

export { showSuccessMessage, showErrorMessage };
