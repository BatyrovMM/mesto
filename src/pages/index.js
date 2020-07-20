// Импорт
import "./index.css";
import {Api} from '../components/API.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'
import {Section} from '../components/Section.js'
import {initialCards, popupEdit, editButton, nameChange, statusChange, sectionCards, lightBox, popupCardAdd, popupDeleteCard, 
cardAddButton, formValidation, formValidationOptions} from '../components/constants.js';

//////////////////////////////
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/',
  headers: {
    authorization: '2c19e651-b945-42b9-b74c-9d75647e0f4e',
    'Content-Type': 'application/json'
  },
});

function getUserInfo() {
  api.getUserInfo()
  .then((user) => {
    aboutUser.getUserInfo(user.name, user.about, user.avatar);
    aboutUser.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  });
}

getUserInfo();

api.getInitialCards()
.then((res) => {
  console.log(res)
});
//////////////////////////////

// Выбор тега имени и статуса
const aboutUser = new UserInfo(
  {
    profileName: '.profile__name', 
    profileStatus: '.profile__status',
    profileAvatar: '.profile__avatar'
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