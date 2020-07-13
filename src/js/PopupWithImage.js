import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    const LightBoxImage = this._popupSelector.querySelector('.popup__lightbox-image')
    const LightBoxCaption = this._popupSelector.querySelector('.popup__lightbox-caption')
    LightBoxImage.src = data.link;
    LightBoxImage.alt = data.name;
    LightBoxCaption.textContent = data.name;
    super.open();
  }
}

export {PopupWithImage};