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
const infoSaveChange = popupEdit.querySelector('.popup__info-change');      // Выбор формы изменения имени и статуса
const closeButton = page.querySelector('.popup__close');                    // Выбор кнопки закрытия
const profileName = page.querySelector('.profile__name');                   // Выбор тега с именем
const profileStatus = page.querySelector('.profile__status');               // Выбор тега со статусом
const nameChange = popupEdit.querySelector('.popup__name-change');          // Выбор инпута смены имени
const statusChange = popupEdit.querySelector('.popup__status-change');      // Выбор инпута смены статуса
const sectionCards = document.querySelector('.cards');                      // Секция cards
const cardTemplate = document.querySelector('#new-card').content;           // Темплейт фотокарточки
// Попап для добавления карточек
const popupCardAdd = page.querySelector('.popup__new-card');                // Выбор попапа с формой добавления фотокарточки
const cardAddButton = page.querySelector('.profile__add-button');           // Выбор кнопки "плюс"
const cardAddSave = popupCardAdd.querySelector('.popup__new-card-add');     // Выбор формы добавления фотокарточек
const cardAddName = popupCardAdd.querySelector('.popup__new-card-name');    // Выбор инпута названия фотокарточки
const cardAddUrl = popupCardAdd.querySelector('.popup__new-card-url');      // Выбор инпута ссылки фотокарточки
// Попап для просмотра фото
const lightBox = page.querySelector('.popup__lightbox');                    // Выбор попапа "lightbox"
const lightboxImage = lightBox.querySelector('.popup__lightbox-image');     // Выбор фото в "lightbox"
const lightboxCaption = lightBox.querySelector('.popup__lightbox-caption'); // Выбор названия в "lightbox"

// Функции

// Открывает попапы
function openPopup(blockPop) {
  blockPop.classList.add('popup_active');
  blockPop.querySelector('.popup__close').addEventListener('click', () => closePopup(blockPop));
}

// Закрывает попапы
function closePopup(blockPop) {
  blockPop.classList.remove('popup_active')
}

// Открытие попапа с пустыми инпутами (форма изменения имени и статуса)
function openPopupEdit() {
  openPopup(popupEdit)
  nameChange.value = profileName.textContent;
  statusChange.value = profileStatus.textContent;
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
  const cardPhoto = cardFromArrays.querySelector('.card__photo')
  cardFromArrays.querySelector('.card__photo-name').textContent = name;
  cardPhoto.src = link;
  cardPhoto.alt = name;

  cardFromArrays.querySelector('.card__like').addEventListener('click', function (evt) {      // Отвечает за лайк
  evt.target.classList.toggle('card__like_active');
  });

  cardFromArrays.querySelector('.card__delete').addEventListener('click', function (evt) {    // Отвечает за удаление
    evt.target.closest('.card').remove();
  });

  cardPhoto.addEventListener('click', function () {                                           // Отвечает за lightBox
    lightboxImage.src = link;
    lightboxCaption.textContent = name;
    openPopup(lightBox);
  });
  
  return cardFromArrays;
};

// Достаём фотокарточки из массива и вставляем в cards
initialCards.forEach(function (item) {
  sectionCards.prepend(createCards(item.name, item.link));
});

// Открытие попапа с пустыми инпутами (форма добавления фотокарточек)
function openPopupCardAdd() {
  openPopup(popupCardAdd);
  cardAddName.value = '';
  cardAddUrl.value = '';
};

// Вставляем фотокарточки в cards
function prependNewCard() {
  sectionCards.prepend(createCards(cardAddName.value, cardAddUrl.value));
}

// Добавляет новые фотокарточки
function addNewCard(event) {
  event.preventDefault()
  
  createCards(cardAddName.value, cardAddUrl.value);

  prependNewCard()

  closePopup(popupCardAdd);
}

editButton.addEventListener('click', openPopupEdit);          // Кнопка "карандаш"
infoSaveChange.addEventListener('submit', saveChanges);       // Отправка формы изменения имени и статуса
cardAddButton.addEventListener('click', openPopupCardAdd);    // Кнопка "плюс"
cardAddSave.addEventListener('submit', addNewCard);           // Отправка формы добавления фотокарточки