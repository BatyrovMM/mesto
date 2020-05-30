const page = document.querySelector('.page');
// Попап для смены имени
const popupEdit = page.querySelector('.popup__edit');
const editButton = page.querySelector('.profile__edit');
const infoSaveChange = page.querySelector('.popup__info-save');
const nameChange = popupEdit.querySelector('.popup__name-change');
const profileName = page.querySelector('.profile__name');
const profileStatus = page.querySelector('.profile__status');
const closeButtonFormEdit = popupEdit.querySelector('.popup__close');
const statusChange = popupEdit.querySelector('.popup__status-change');

function openPopupEdit() {
  popupEdit.classList.remove('popup_none');
  nameChange.value = profileName.textContent;
  statusChange.value = profileStatus.textContent;
}
function closePopupEdit() {
  popupEdit.classList.add('popup_none');
};

function saveChanges() {
  profileName.textContent = nameChange.value;
  profileStatus.textContent = statusChange.value;
  
  nameChange.value = '';
  statusChange.value = '';
  closePopupEdit();
};

editButton.addEventListener('click', openPopupEdit);
closeButtonFormEdit.addEventListener('click', closePopupEdit);
infoSaveChange.addEventListener('click', saveChanges);

// Закрывает popup при нажатии на esc
window.onkeydown = function(event) { 
  if (event.keyCode == 27) {
    closePopupEdit();
    closePopupCardAdd();
    closeLightBox()
  }
};


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
// Загрузка карточек из массива
const sectionCards = document.querySelector('.cards');
const card = document.querySelector('#new-card').content;     // Темплейт фотокарточки

function arraysCards(name, link) {
  const cardFromArrays = card.cloneNode(true);
  cardFromArrays.querySelector('.card__photo').src = link;
  cardFromArrays.querySelector('.card__photo-name').textContent = name;
  
  cardFromArrays.querySelector('.card__like').addEventListener('click', function (evt) {      //Отвечает за лайк
  evt.target.classList.toggle('card__like_active');
  });

  cardFromArrays.querySelector('.card__delete').addEventListener('click', function (evt) {      //Отвечает за удаление
    evt.target.closest('.card').remove();
  });

  cardFromArrays.querySelector('.card__photo').addEventListener('click', function () {      //Отвечает за lightBox
    lightboxImage.src = link;
    lightboxCaption.textContent = name;
    lightBox.classList.remove('popup_none');
  });

  sectionCards.prepend(cardFromArrays);
};



initialCards.forEach(function (item) {
  arraysCards(item.name, item.link)
});



//Попап для добавления карточек
const popupCardAdd = page.querySelector('.popup__new-card')
const cardAddButton = page.querySelector('.profile__add-button')
const cardAddSave = popupCardAdd.querySelector('.popup__new-card-save')
const cardAddName = popupCardAdd.querySelector('.popup__new-card-name');
const cardAddUrl = popupCardAdd.querySelector('.popup__new-card-url');
const closeButtonCardAdd = popupCardAdd.querySelector('.popup__close');

function openPopupCardAdd() {
  popupCardAdd.classList.remove('popup_none');
  cardAddName.value = '';
  cardAddUrl.value = '';
};

function closePopupCardAdd() {
  popupCardAdd.classList.add('popup_none');
};


function addNewCard() {
  arraysCards(cardAddName.value, cardAddUrl.value)
  
  cardAddName.value = '';
  cardAddUrl.value = '';
  
  closePopupCardAdd();
}

cardAddButton.addEventListener('click', openPopupCardAdd);
closeButtonCardAdd.addEventListener('click', closePopupCardAdd);
cardAddSave.addEventListener('click', addNewCard);

//Попап для просмотра фото
const lightBox = page.querySelector('.popup__lightbox');
const lightboxImage = lightBox.querySelector('.popup__lightbox-image');
const lightboxCaption = lightBox.querySelector('.popup__lightbox-caption');
const closeButtonLightBox = lightBox.querySelector('.popup__close');

function closeLightBox() {
  lightBox.classList.add('popup_none');
}

closeButtonLightBox.addEventListener('click', closeLightBox);