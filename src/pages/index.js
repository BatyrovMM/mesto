// Импорт
import "./index.css";
import {Card} from '../js/Card.js';
import {FormValidator} from '../js/FormValidator.js';
import {PopupWithForm} from '../js/PopupWithForm.js';
import {PopupWithImage} from '../js/PopupWithImage.js'
import {UserInfo} from '../js/UserInfo.js'
import {Section} from '../js/Section.js'
import {initialCards, popupEdit, editButton, nameChange, statusChange, sectionCards, lightBox, popupCardAdd, 
cardAddButton, formValidation, formValidationOptions} from '../components/constants.js';

// Выбор тега имени и статуса
const aboutUser = new UserInfo(
  {
    profileName: '.profile__name', 
    profileStatus: '.profile__status'
  }
);
// Выбор попапа "lightbox"
const lightBoxOpen = new PopupWithImage(lightBox);
// Выбор класса FormValidator для работы функций
const form = new FormValidator(formValidationOptions, formValidation);

function renderCard(item) {
  const card = new Card({
    data: item, handleCardClick: () => {
      lightBoxOpen.open(item);
    }
  },'#new-card');
  const cardElement = card.newCard();
  loadCards.addItem(cardElement);
  popupNewCard.close();
}

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
  renderer: renderCard
}, sectionCards)


// Открытие попапа с пустыми инпутами (форма добавления фотокарточек)
const openPopupCardAdd = () => {
  const buttonSaveForm = popupCardAdd.querySelector('.popup__form-button')
  form.toggleButtonState(true, buttonSaveForm);
  form.clearError(popupCardAdd);
  popupNewCard.open();
}

// Добавляет новые фотокарточки
const popupNewCard = new PopupWithForm(popupCardAdd, {
  onSubmit: renderCard
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