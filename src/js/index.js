// Импорт
import "../pages/index.css";
import {initialCards, Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js'
import {PopupWithImage} from './PopupWithImage.js';
import {UserInfo} from './UserInfo.js';
import {PopupWithForm} from './PopupWithForm.js';

// Все объявленные константы
const page = document.querySelector('.page');
// Попап для смены имени
// Выбор тега имени и статуса
const aboutUser = new UserInfo(
  {
    profileName: '.profile__name', 
    profileStatus: '.profile__status'
  }
);
// Выбор попапа с формой изменения имени и статуса
const popupEdit = page.querySelector('.popup__edit');
// Выбор кнопки "карандаш"
const editButton = page.querySelector('.profile__edit');
// Выбор инпута смены имени
const nameChange = popupEdit.querySelector('.popup__input_name-change');
// Выбор инпута смены статуса
const statusChange = popupEdit.querySelector('.popup__input_status-change');
// Секция cards
const sectionCards = document.querySelector('.cards');
const lightBox = document.querySelector('.popup__lightbox');
// Попап для добавления карточек
// Выбор попапа с формой добавления фотокарточки
const popupCardAdd = page.querySelector('.popup__new-card');                      
// Выбор кнопки "плюс"
const cardAddButton = page.querySelector('.profile__add-button');                
// Выбор попапа "lightbox"
const lightBoxOpen = new PopupWithImage(lightBox);

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


// Сохраняет изменения в форме изменения имени и статуса
const saveChanges = new PopupWithForm(popupEdit, {
  onSubmit: (item) => {
      aboutUser.setUserInfo(item);
      saveChanges.close();
    }
});

// Открытие попапа с пустыми инпутами (форма изменения имени и статуса) 
const openPopupEdit = () => {
  const userData = aboutUser.getUserInfo();
  nameChange.value = userData.nameInput;
  statusChange.value = userData.statusInput;
  const buttonSaveForm = popupEdit.querySelector('.popup__form-button')
  form.toggleButtonState(false, buttonSaveForm);
  form.clearError(popupEdit);
  saveChanges.open();
}

// Константа: при вызове загрузит карты из массива
const loadCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item, handleCardClick: () => {
        lightBoxOpen.open(item);
      }
    },'#new-card');
    const cardElement = card.newCard();
    loadCards.addItem(cardElement);
  }
}, sectionCards)


// Открытие попапа с пустыми инпутами (форма добавления фотокарточек)
const openPopupCardAdd = () => {
  const buttonSaveForm = popupCardAdd.querySelector('.popup__form-button')
  form.toggleButtonState(true, buttonSaveForm);
  form.clearError(popupCardAdd);
  addNewCard.open();
}

// Добавляет новые фотокарточки
const addNewCard = new PopupWithForm(popupCardAdd, {
  onSubmit: (item) => {
    const card = new Card({
      data: item, handleCardClick: () => {
        lightBoxOpen.open(item);
      }
    },'#new-card');
    const cardElement = card.newCard();
    loadCards.addItem(cardElement);
    addNewCard.close();
  }
});


// Кнопка "карандаш"
editButton.addEventListener('click', () => openPopupEdit());
// Кнопка "плюс"
cardAddButton.addEventListener('click', () => openPopupCardAdd());
// Загружаем фотокарточки
loadCards.renderItems()

// Функция валидации из модуля
function enableValidation() {
  formValidation.forEach((item) => {
    const validation = new FormValidator(formValidationOptions, item);
    validation.enableValidation();
  });
}

// Включаем валидацию
enableValidation();