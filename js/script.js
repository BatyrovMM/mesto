// Массив первых шести фотокарточек
const initialCards = [ 
  {
    name: 'Outer Life',
    link: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Outer World',
    link: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?ixlib=rb-1.2.1&auto=format&fit=crop&w=733&q=80'
  },
  {
    name: 'Outer Space',
    link: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1940&q=80'
  },
  {
    name: 'Far From Home',
    link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
  },
  {
    name: 'Space Shuttle',
    link: 'https://images.unsplash.com/photo-1454789415558-bdda08f4eabb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Astronaut',
    link: 'https://images.unsplash.com/photo-1542649761-0bdd3753c8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
];

// Все объявленные константы
const page = document.querySelector('.page');
// Попап для смены имени
const popupEdit = page.querySelector('.popup__edit');                       // Выбор попапа с формой изменения имени и статуса
const editButton = page.querySelector('.profile__edit');                    // Выбор кнопки "карандаш"
const infoSaveChange = popupEdit.querySelector('.popup__form');      // Выбор формы изменения имени и статуса
const profileName = page.querySelector('.profile__name');                   // Выбор тега с именем
const profileStatus = page.querySelector('.profile__status');               // Выбор тега со статусом
const nameChange = popupEdit.querySelector('.popup__input_name-change');          // Выбор инпута смены имени
const statusChange = popupEdit.querySelector('.popup__input_status-change');      // Выбор инпута смены статуса
const sectionCards = document.querySelector('.cards');                      // Секция cards
const cardTemplate = document.querySelector('#new-card').content;           // Темплейт фотокарточки
// Попап для добавления карточек
const popupCardAdd = page.querySelector('.popup__new-card');                // Выбор попапа с формой добавления фотокарточки
const cardAddButton = page.querySelector('.profile__add-button');           // Выбор кнопки "плюс"
const cardAddSave = popupCardAdd.querySelector('.popup__form');     // Выбор формы добавления фотокарточек
const cardAddName = popupCardAdd.querySelector('.popup__input_new-card-name');    // Выбор инпута названия фотокарточки
const cardAddUrl = popupCardAdd.querySelector('.popup__new-card-url');      // Выбор инпута ссылки фотокарточки
// Попап для просмотра фото
const lightBox = page.querySelector('.popup__lightbox');                    // Выбор попапа "lightbox"
const lightboxImage = lightBox.querySelector('.popup__lightbox-image');     // Выбор фото в "lightbox"
const lightboxCaption = lightBox.querySelector('.popup__lightbox-caption'); // Выбор названия в "lightbox"

// Обработчики

// Обработчик нажатия на кнопку "крестик"
function closeButtonHandler() { 
  const openedPopup = document.querySelector('.popup_active');
  closePopup(openedPopup);
};

// Обработчик нажатия на оверлей
function closeOverlayHandler() { 
  const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
};

// Обработчик нажатия на кнопку "Escape"
function ButtonEscapeHandler(evt) { 
  const openedPopup = document.querySelector('.popup_active');
  if (evt.key === 'Escape') {
  closePopup(openedPopup);
  };
};

// Функции

// Добавление слушателей к попапам
function addPopupListener(blockPop) {
  blockPop.querySelector('.popup__close').addEventListener('click', closeButtonHandler);
  // blockPop.addEventListener('click', closeOverlayHandler);
  document.addEventListener('keydown', ButtonEscapeHandler);
};

// Удаление слушателей у попапов 
function removePopupListener(blockPop) {
  blockPop.querySelector('.popup__close').removeEventListener('click', closeButtonHandler);
  // blockPop.removeEventListener('click', closeOverlayHandler);
  document.removeEventListener('keydown', ButtonEscapeHandler);
};

// Открывает попап со слушателем
function openPopup(blockPop) {
  blockPop.classList.add('popup_active');
  addPopupListener(blockPop);
};

// Закрывает попап и удаляет слушатель
function closePopup(blockPop) { 
  removePopupListener(blockPop);
  blockPop.classList.remove('popup_active')
}

// Открытие попапа с пустыми инпутами (форма изменения имени и статуса)
function openPopupEdit() {
  nameChange.value = profileName.textContent;
  statusChange.value = profileStatus.textContent;
  openPopup(popupEdit);
};

// Сохраняет изменения в форме изменения имени и статуса
function saveChanges(event) {
  event.preventDefault()
  profileName.textContent = nameChange.value;
  profileStatus.textContent = statusChange.value;
  
  nameChange.value = '';
  statusChange.value = '';
  closePopup(popupEdit);
};

// Функция тела фотокарточек
function createCards(name, link) {
  const cardFromArrays = cardTemplate.cloneNode(true);
  const cardPhoto = cardFromArrays.querySelector('.card__photo');
  const cardLike = cardFromArrays.querySelector('.card__like');
  const cardDelete = cardFromArrays.querySelector('.card__delete');
  cardFromArrays.querySelector('.card__photo-name').textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;

  cardLike.addEventListener('click', function (evt) {                                         // Отвечает за лайк
    evt.target.classList.toggle('card__like_active');
  });

  cardDelete.addEventListener('click', function (evt) {                                       // Отвечает за удаление
    evt.target.closest('.card').remove();
  });

  cardPhoto.addEventListener('click', function () {                                           // Отвечает за lightBox
    lightboxImage.src = link;
    lightboxCaption.textContent = name;
    openPopup(lightBox);
  });
  
  return cardFromArrays;
};

// Функция вставки фото, в самом начале
function prependNewCard(name, link) {
  sectionCards.prepend(createCards(name, link));
}

// Функция: при вызове загрузит карты из массива
function loadCards() {
  initialCards.forEach( (item) => {
    prependNewCard(item.name, item.link);
  });
}

// Открытие попапа с пустыми инпутами (форма добавления фотокарточек)
function openPopupCardAdd() {
  cardAddName.value = '';
  cardAddUrl.value = '';
  openPopup(popupCardAdd);
};

// Добавляет новые фотокарточки
function addNewCard(event) {
  event.preventDefault()

  prependNewCard(cardAddName.value, cardAddUrl.value);                

  closePopup(popupCardAdd);
}

editButton.addEventListener('click', openPopupEdit);          // Кнопка "карандаш"
infoSaveChange.addEventListener('submit', saveChanges);       // Отправка формы изменения имени и статуса
cardAddButton.addEventListener('click', openPopupCardAdd);    // Кнопка "плюс"
cardAddSave.addEventListener('submit', addNewCard);           // Отправка формы добавления фотокарточки

loadCards();                                                  // Загружаем фотокарточки