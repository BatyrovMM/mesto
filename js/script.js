const page = document.querySelector('.page');
const popup = page.querySelector('.popup_none');
const editButton = page.querySelector('.profile__edit');
const closeButton = popup.querySelector('.popup__close');
const profileName = page.querySelector('.profile__name');
const profileStatus = page.querySelector('.profile__status');
const infoSaveChange = page.querySelector('.popup__info-save');
const nameChange = popup.querySelector('.popup__name-change');
const statusChange = popup.querySelector('.popup__status-change');

function openPopup() {
  popup.classList.remove('popup_none');
  nameChange.value = profileName.textContent;
  statusChange.value = profileStatus.textContent;
}

function closePopup() {
  popup.classList.add('popup_none');
}

// Закрывает popup при нажатии на esc
window.onkeydown = function(event) { 
  if (event.keyCode == 27) {
    closePopup();
  }
};

function saveChanges() {
  profileName.textContent = nameChange.value;
  profileStatus.textContent = statusChange.value;

  nameChange.value = '';
  statusChange.value = '';
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
infoSaveChange.addEventListener('click', saveChanges);