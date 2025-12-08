const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(' ').filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (hashtag === '#') {
      return false;
    }

    if (!HASHTAG_REGEX.test(hashtag)) {
      return false;
    }

    for (let j = i + 1; j < hashtags.length; j++) {
      if (hashtag === hashtags[j]) {
        return false;
      }
    }
  }

  return true;
};

const getHashtagErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = value.trim().toLowerCase().split(' ').filter(Boolean);

  if (hashtags.length > MAX_HASHTAGS) {
    return `Не более ${MAX_HASHTAGS} хэш-тегов`;
  }

  for (const hashtag of hashtags) {
    if (hashtag === '#') {
      return 'Хэш-тег не может состоять только из решётки';
    }

    if (!HASHTAG_REGEX.test(hashtag)) {
      return 'Хэш-тег должен начинаться с # и содержать только буквы и цифры';
    }

    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return `Максимум ${MAX_HASHTAG_LENGTH} символов`;
    }
  }

  const uniqueHashtags = new Set(hashtags);
  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  return '';
};

const validateComment = (value) => {
  return value.length <= MAX_COMMENT_LENGTH;
};

const initValidation = (form) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    successClass: 'img-upload__field-wrapper--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtags,
    getHashtagErrorMessage
  );

  pristine.addValidator(
    form.querySelector('.text__description'),
    validateComment,
    `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`
  );

  return pristine;
};

export { initValidation };
