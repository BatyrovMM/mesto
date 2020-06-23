import {initialCards, Card} from './Card.js';


// Все объявленные константы
const page = document.querySelector('.page');
// Попап для смены имени
const popupEdit = page.querySelector('.popup__edit');                             // Выбор попапа с формой изменения имени и статуса
const editButton = page.querySelector('.profile__edit');                          // Выбор кнопки "карандаш"
const infoSaveChange = popupEdit.querySelector('.popup__form');                   // Выбор формы изменения имени и статуса
const profileName = page.querySelector('.profile__name');                         // Выбор тега с именем
const profileStatus = page.querySelector('.profile__status');                     // Выбор тега со статусом
const nameChange = popupEdit.querySelector('.popup__input_name-change');          // Выбор инпута смены имени
const statusChange = popupEdit.querySelector('.popup__input_status-change');      // Выбор инпута смены статуса
const sectionCards = document.querySelector('.cards');                            // Секция cards
// Попап для добавления карточек
const popupCardAdd = page.querySelector('.popup__new-card');                      // Выбор попапа с формой добавления фотокарточки
const cardAddButton = page.querySelector('.profile__add-button');                 // Выбор кнопки "плюс"
const cardAddSave = popupCardAdd.querySelector('.popup__form');                   // Выбор формы добавления фотокарточек
const cardAddName = popupCardAdd.querySelector('.popup__input_new-card-name');    // Выбор инпута названия фотокарточки
const cardAddUrl = popupCardAdd.querySelector('.popup__new-card-url');            // Выбор инпута ссылки фотокарточки

// Обработчики

// Обработчик нажатия на кнопку "крестик"
function closeButtonHandler() {
  const openedPopup = document.querySelector('.popup_active');
  closePopup(openedPopup);
}

// Обработчик нажатия на оверлей
function closeOverlayHandler(evt) {
  if (evt.target.classList.contains('popup')) {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}

// Обработчик нажатия на кнопку "Escape"
function buttonEscapeHandler(evt) {
  const openedPopup = document.querySelector('.popup_active');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

// Функции

//Шаблон из классов для валидации
const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inputErrorClass: 'popup__input_invalid',
}

// Добавление слушателей к попапам
function addPopupListener(blockPop) {
  blockPop.querySelector('.popup__close').addEventListener('click', closeButtonHandler);
  blockPop.addEventListener('click', closeOverlayHandler);
  document.addEventListener('keydown', buttonEscapeHandler);
}

// Удаление слушателей у попапов 
function removePopupListener(blockPop) {
  blockPop.querySelector('.popup__close').removeEventListener('click', closeButtonHandler);
  blockPop.removeEventListener('click', closeOverlayHandler);
  document.removeEventListener('keydown', buttonEscapeHandler);
}

// Открывает попап со слушателем
function openPopup(blockPop) {
  blockPop.classList.add('popup_active');
  addPopupListener(blockPop);
}

// Закрывает попап и удаляет слушатель
function closePopup(blockPop) {
  removePopupListener(blockPop);
  blockPop.classList.remove('popup_active');
  clearError(blockPop);
}

// Открытие попапа с пустыми инпутами (форма изменения имени и статуса)
function openPopupEdit() {
  nameChange.value = profileName.textContent;
  statusChange.value = profileStatus.textContent;
  const buttonSaveForm = popupEdit.querySelector('.popup__form-button')
  toggleButtonState(false, buttonSaveForm);
  openPopup(popupEdit);
}

// Сохраняет изменения в форме изменения имени и статуса
function saveChanges(event) {
  event.preventDefault()
  profileName.textContent = nameChange.value;
  profileStatus.textContent = statusChange.value;

  nameChange.value = '';
  statusChange.value = '';
  closePopup(popupEdit);
}

// Функция вставки фото, в самом начале
function prependNewCard(element) {
  sectionCards.prepend(element);
}

// Функция: при вызове загрузит карты из массива
function loadCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, '#new-card');
    const cardElement = card.newCard();
    prependNewCard(cardElement);
  });
}

//Переименовать некоторые функции и доделать добавление карт. Начать форму валидации

// Открытие попапа с пустыми инпутами (форма добавления фотокарточек)
function openPopupCardAdd() {
  cardAddName.value = '';
  cardAddUrl.value = '';
  const buttonSaveForm = popupCardAdd.querySelector('.popup__form-button')
  toggleButtonState(true, buttonSaveForm);
  openPopup(popupCardAdd);
}

// Добавляет новые фотокарточки
function addNewCard(event) {
  event.preventDefault()

  const item = [];
  item.name = cardAddName.value;
  item.link = cardAddUrl.value;

  const card = new Card(item, '#new-card');
  const cardElement = card.newCard();
  prependNewCard(cardElement);

  closePopup(popupCardAdd);
}

editButton.addEventListener('click', openPopupEdit);          // Кнопка "карандаш"
infoSaveChange.addEventListener('submit', saveChanges);       // Отправка формы изменения имени и статуса
cardAddButton.addEventListener('click', openPopupCardAdd);    // Кнопка "плюс"
cardAddSave.addEventListener('submit', addNewCard);           // Отправка формы добавления фотокарточки

loadCards();                                                  // Загружаем фотокарточки

enableValidation(formValidationOptions);                      // Включаем валидацию с данными из шаблона

export {openPopup}