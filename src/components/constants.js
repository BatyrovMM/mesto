// Массив первых шести фотокарточек
const initialCards = [
  {
    name: 'Astronaut',
    link: 'https://images.unsplash.com/photo-1542649761-0bdd3753c8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Space Shuttle',
    link: 'https://images.unsplash.com/photo-1454789415558-bdda08f4eabb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Far From Home',
    link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
  },
  {
    name: 'Outer Space',
    link: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1940&q=80'
  },
  {
    name: 'Outer World',
    link: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?ixlib=rb-1.2.1&auto=format&fit=crop&w=733&q=80'
  },
  {
    name: 'Outer Life',
    link: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

// Почему бы и нет?
function randomCard(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

console.log(`Ссылка для создания классной карточки - ${randomCard(initialCards).link}`);

// Все объявленные константы
const page = document.querySelector('.page');
// Попап для смены имени
// Выбор попапа с формой изменения имени и статуса
const popupEdit = page.querySelector('.popup_edit');
// Выбор попапа с формой изменения имени и статуса
const avatarEdit = page.querySelector('.popup_new-avatar');
// Выбор кнопки "карандаш"
const editButtonInfo = page.querySelector('.profile__edit');
// Кнопка "карандаш" (аватар)
const editButtonAvatar = page.querySelector('.profile__avatar-edit');
// Выбор инпута смены имени
const nameChange = popupEdit.querySelector('.popup__input_name-change');
// Выбор инпута смены статуса
const statusChange = popupEdit.querySelector('.popup__input_status-change');
// Секция cards
const sectionCards = document.querySelector('.cards');
const lightBox = document.querySelector('.popup_lightbox');
// Попап для добавления карточек
// Выбор попапа с формой добавления фотокарточки
const popupCardAdd = page.querySelector('.popup_new-card');                      
// Выбор кнопки "плюс"
const cardAddButton = page.querySelector('.profile__add-button');
// Выбор попапа удаления
const popupDeleteCard = page.querySelector('.popup_delete-card');

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

export {popupEdit, avatarEdit, editButtonInfo, editButtonAvatar, nameChange, statusChange, sectionCards, lightBox, popupCardAdd, cardAddButton, popupDeleteCard, formValidation, formValidationOptions}