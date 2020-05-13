let page = document.querySelector('.page');
let popup = page.querySelector('.display-none');
let editButton = page.querySelector('.profile__edit');
let closeButton = popup.querySelector('.popup__close');
let profileName = page.querySelector('.profile__name');
let profileStatus = page.querySelector('.profile__status');
let infoSaveChange = page.querySelector('.popup__info-save');
let nameChange = popup.querySelector('.popup__name-change');
let statusChange = popup.querySelector('.popup__status-change');

function openPopup() {
  popup.classList.remove('display-none');
  nameChange.value = profileName.textContent;
  statusChange.value = profileStatus.textContent;
}

function closePopup() {
  popup.classList.add('display-none');
}

function saveChanges() {
  profileName.textContent = `${nameChange.value}`;
  profileStatus.textContent = `${statusChange.value}`;

  nameChange.value = '';
  statusChange.value = '';
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
infoSaveChange.addEventListener('click', saveChanges);