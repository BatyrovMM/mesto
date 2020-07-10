import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    const LightBoxImage = document.querySelector('.popup__lightbox-image')
    const LightBoxCaption = document.querySelector('.popup__lightbox-caption')
    LightBoxImage.src = data.link;
    LightBoxImage.alt = data.name;
    LightBoxCaption.textContent = data.name;
    super.open();
  }
}

export {PopupWithImage};