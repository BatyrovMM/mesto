// Импорт
import "./index.css";
import {Api} from '../components/API.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js'
import {Section} from '../components/Section.js'
import {popupEdit, avatarEdit, editButtonInfo, editButtonAvatar, nameChange, statusChange, sectionCards, lightBox, popupCardAdd, cardAddButton, popupDeleteCard, formValidation, formValidationOptions} from '../components/constants.js';

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
// Выбор API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '2c19e651-b945-42b9-b74c-9d75647e0f4e',
    'Content-Type': 'application/json'
  },
});
// Пустая переменная для ID
let userId;

// Функция загрузки имени из сервера
function getUserInfo() {
  api.getUserInfo()
  .then((user) => {
    aboutUser.getUserInfo(user.name, user.about, user.avatar);
    aboutUser.setUserInfo(user);
    userId = user._id;
  })
  .catch((err) => {
    console.log(err);
  });
}

// Функция информирующая о загрузке
function renderLoad(isLoading, blockPop, value) {
  const buttonSaveForm = blockPop.querySelector('.popup__form-button');
  if (isLoading) {
    buttonSaveForm.textContent = 'Загрузка...';
    buttonSaveForm.setAttribute('disabled', true);
  } else {
    buttonSaveForm.textContent = value;
    buttonSaveForm.removeAttribute('disabled', true);
  }
}

// Сохраняет изменения в форме изменения имени и статуса
const saveChanges = new PopupWithForm(popupEdit, {
  onSubmit: (item) => {
    renderLoad(true, popupEdit, 'Сохранить');
    api.sendUserInfo(item.name, item.status)
    .then((res) => {
      aboutUser.setUserInfo(res)
      saveChanges.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoad(false, popupEdit, 'Сохранить');
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

// Открытие попапа с пустыми инпутами (форма изменения профиля аватара)
const openAvatarEdit = () => {
  const buttonSaveForm = avatarEdit.querySelector('.popup__form-button')
  form.toggleButtonState(true, buttonSaveForm);
  form.clearError(avatarEdit);
  saveAvatar.open();
}

// Сохранение нового аватара (форма изменения профиля аватара)
const saveAvatar = new PopupWithForm(avatarEdit, {
  onSubmit: (item) => {
    renderLoad(true, avatarEdit, 'Создать');
    api.sendUserAvatar(item.avatar)
    .then((res) => {
      aboutUser.setUserInfo(res)
      saveAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoad(false, avatarEdit, 'Создать');
    })
  }
})

// Функция рендера карт
function renderCard(item) {
  const card = new Card({
    data: item, 
    handleCardClick: () => {
      lightBoxOpen.open(item);
    },
    handleDeleteClick: () => {
      const deleteCard = new PopupWithForm(popupDeleteCard, {
        onSubmit: () => {
          renderLoad(true, popupDeleteCard, 'Да');
          api.deleteCard(card._cardId)
          .then((res) => {
            card._remove(res);
            deleteCard.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            renderLoad(false, popupDeleteCard, 'Да');
          })
        }
      });
      deleteCard.open(item); 
    }
  },'#new-card',
    () => api.addLike(item._id),
    () => api.removeLike(item._id), userId);
  const cardElement = card.newCard();
  loadCards.addItem(cardElement);
}

// Константа: при вызове загрузит карты из массива
const loadCards = new Section({
  renderer: (item) => {
    renderCard(item);
  }
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
  onSubmit: (item) => {
    renderLoad(true, popupCardAdd, 'Создать');
    api.postNewCard(item.name, item.link)
    .then((res) => {
      renderCard(res);
      popupNewCard.close();
      // Не знаю как должно быть, но при создании карта улетает вниз. Я решил делать рестарт страницы,
      // ибо при обновлении карточка появляеться наверху.
      document.location.reload();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoad(false, popupCardAdd, 'Создать');
    })
  }
});

// Кнопка "карандаш"
editButtonInfo.addEventListener('click', () => openPopupEdit());
// Кнопка "плюс"
cardAddButton.addEventListener('click', () => openPopupCardAdd());
// Кнопка "карандаш" (аватар)
editButtonAvatar.addEventListener('click', () => openAvatarEdit());

// Загружаем имя и статус с сервера
getUserInfo();

// Загружаем фотокарточки
api.getInitialCards()
.then((res) => {
  loadCards.renderItems(res)
})
.catch((err) => {
  console.log(err);
});

// Функция валидации из модуля
function enableValidation() {
  formValidation.forEach((item) => {
    const validation = new FormValidator(formValidationOptions, item);
    validation.enableValidation();
  });
}

// Включаем валидацию
enableValidation();