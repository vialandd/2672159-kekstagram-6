const body = document.body;

const closeModal = (modal) => {
  modal.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    const openModalElement = document.querySelector('.modal:not(.hidden)');
    if (openModalElement) {
      closeModal(openModalElement);
    }
  }
};

const openModal = (modal) => {
  modal.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

export { closeModal, openModal };
