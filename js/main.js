const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Иван', 'Ольга'];

const createComment = () => {
  const messageCount = getRandomInteger(1, 2);
  const usedMessages = [];
  let message = '';

  for (let i = 0; i < messageCount; i++) {
    let randomMessage;

    do {
      randomMessage = getRandomArrayElement(MESSAGES);
    } while (usedMessages.includes(randomMessage) && usedMessages.length < MESSAGES.length);

    usedMessages.push(randomMessage);
    message += (i > 0 ? ' ' : '') + randomMessage;
  }

  const commentId = getRandomInteger(1, 1000);

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES)
  };
};

const createComments = () => {
  const commentsCount = getRandomInteger(0, 30);
  const commentsArray = [];
  const usedCommentIds = [];

  for (let i = 0; i < commentsCount; i++) {
    let comment;
    let attempts = 0;

    do {
      comment = createComment();
      attempts++;
    } while (usedCommentIds.includes(comment.id) && attempts < 100);

    if (attempts < 100) {
      usedCommentIds.push(comment.id);
      commentsArray.push(comment);
    }
  }

  return commentsArray;
};

const createPhoto = (id) => {
  const descriptions = [
    'Прекрасный закат на море',
    'Городские огни ночью',
    'Уютный осенний парк',
    'Горный пейзаж',
    'Уличное искусство',
    'Кофе утром',
    'Путешествие по неизведанным местам',
    'Архитектура старого города',
    'Летний пикник',
    'Зимняя сказка'
  ];

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(15, 200),
    comments: createComments()
  };
};

const generatePhotos = () => {
  const photosArray = [];

  for (let i = 1; i <= 25; i++) {
    photosArray.push(createPhoto(i));
  }

  return photosArray;
};

export { generatePhotos };
