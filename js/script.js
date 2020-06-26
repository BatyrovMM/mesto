// Импорт
import {initialCards, Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

// Все объявленные константы
const page = document.querySelector('.page');

// Попап для смены имени
// Выбор попапа с формой изменения имени и статуса
const popupEdit = page.querySelector('.popup__edit');
// Выбор кнопки "карандаш"
const editButton = page.querySelector('.profile__edit');
// Выбор формы изменения имени и статуса
const infoSaveChange = popupEdit.querySelector('.popup__form');
// Выбор тега с именем
const profileName = page.querySelector('.profile__name');
// Выбор тега со статусом
const profileStatus = page.querySelector('.profile__status');
// Выбор инпута смены имени
const nameChange = popupEdit.querySelector('.popup__input_name-change');
// Выбор инпута смены статуса
const statusChange = popupEdit.querySelector('.popup__input_status-change');
// Секция cards
const sectionCards = document.querySelector('.cards');

// Попап для добавления карточек
// Выбор попапа с формой добавления фотокарточки
const popupCardAdd = page.querySelector('.popup__new-card');                      
 // Выбор кнопки "плюс"
const cardAddButton = page.querySelector('.profile__add-button');                
// Выбор формы добавления фотокарточек
const cardAddSave = popupCardAdd.querySelector('.popup__form');                   
// Выбор инпута названия фотокарточки
const cardAddName = popupCardAdd.querySelector('.popup__input_new-card-name');
// Выбор инпута ссылки фотокарточки
const cardAddUrl = popupCardAdd.querySelector('.popup__new-card-url');

// Валидация
// Выбор всей "формы"
const [...formValidation] = document.querySelectorAll('.popup__form');
//Шаблон из классов для валидации
const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__form-button',
  inputErrorClass: 'popup__input_invalid',
}
// Выбор класса FormValidator для работы функций
const form = new FormValidator(formValidationOptions, formValidation);

// Обработчики

// Обработчик нажатия на кнопку "крестик"
function closeButtonHandler() {
  const openedPopup = document.querySelector('.popup_active');
  closePopup(openedPopup);
}

// Обработчик нажатия на оверлей
function closeOverlayHandler(evt) {
  const openedPopup = document.querySelector('.popup_active');
  if (evt.target.classList.contains('popup')) {
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
  
  form.clearError(blockPop);
}

// Открытие попапа с пустыми инпутами (форма изменения имени и статуса)
function openPopupEdit() {
  nameChange.value = profileName.textContent;
  statusChange.value = profileStatus.textContent;
  const buttonSaveForm = popupEdit.querySelector('.popup__form-button')
  
  form.toggleButtonState(false, buttonSaveForm);

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

// Открытие попапа с пустыми инпутами (форма добавления фотокарточек)
function openPopupCardAdd() {
  cardAddName.value = '';
  cardAddUrl.value = '';
  const buttonSaveForm = popupCardAdd.querySelector('.popup__form-button')
  
  form.toggleButtonState(true, buttonSaveForm);

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

// Кнопка "карандаш"
editButton.addEventListener('click', openPopupEdit);
// Отправка формы изменения имени и статуса
infoSaveChange.addEventListener('submit', saveChanges);
// Кнопка "плюс"
cardAddButton.addEventListener('click', openPopupCardAdd);
// Отправка формы добавления фотокарточки
cardAddSave.addEventListener('submit', addNewCard);
// Загружаем фотокарточки
loadCards();

// Функция валидации из модуля
function enableValidation() {
  formValidation.forEach((item) => {
    const validation = new FormValidator(formValidationOptions, item);
    validation.enableValidation();
  });
}

// Включаем валидацию
enableValidation();

// Экспорт
export {openPopup}