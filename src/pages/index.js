// Импорт
import "./index.css";
import {Api} from '../components/API.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'
import {Section} from '../components/Section.js'
import {initialCards, popupEdit, avatarEdit, editButtonInfo, editButtonAvatar, nameChange, statusChange, sectionCards, lightBox, popupCardAdd, cardAddButton, popupDeleteCard, formValidation, formValidationOptions} from '../components/constants.js';

//////////////////////////////
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
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

function renderLoad(isLoading, blockPop) {
  const buttonSaveForm = blockPop.querySelector('.popup__form-button');
  if (isLoading) {
    buttonSaveForm.textContent = 'Сохранение...';
    buttonSaveForm.setAttribute('disabled', true);
  } else if (blockPop === popupEdit) {
    buttonSaveForm.textContent = 'Сохранить';
    buttonSaveForm.removeAttribute('disabled', true);
  } else {
    buttonSaveForm.textContent = 'Создать';
  }
}
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

// Сохраняет изменения в форме изменения имени и статуса
const saveChanges = new PopupWithForm(popupEdit, {
  onSubmit: (item) => {
    renderLoad(true, popupEdit);
    api.sendUserInfo(item.name, item.status)
    .then((res) => {
      aboutUser.setUserInfo(res)
      saveChanges.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoad(false, popupEdit);
    })
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

const saveAvatar = new PopupWithForm(avatarEdit, {
  onSubmit: (item) => {
    renderLoad(true, avatarEdit);
    api.sendUserAvatar(item.avatar)
    .then((res) => {
      aboutUser.setUserInfo(res)
      saveAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoad(false, avatarEdit);
    })
  }
})

// Открытие попапа с пустыми инпутами (форма изменения профиля аватара)
const openAvatarEdit = () => {
  const buttonSaveForm = avatarEdit.querySelector('.popup__form-button')
  form.toggleButtonState(true, buttonSaveForm);
  form.clearError(avatarEdit);
  saveAvatar.open();
}

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
editButtonInfo.addEventListener('click', () => openPopupEdit());
// Кнопка "плюс"
cardAddButton.addEventListener('click', () => openPopupCardAdd());
// Кнопка "карандаш" (аватар)
editButtonAvatar.addEventListener('click', () => openAvatarEdit());
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