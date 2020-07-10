class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeIcon = this._popupSelector.querySelector('.popup__close');
    this._closeButtonHandler = this._closeButtonHandler.bind(this);
    this._closeOverlayHandler = this._closeOverlayHandler.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_active');
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove('popup_active');
    this.removeEventListeners()
  }

  _closeButtonHandler() {
    this.close()
  }

  _closeOverlayHandler(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close()
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close()
    }
  }

  setEventListeners() {
    this._closeIcon.addEventListener('click', this._closeButtonHandler)
    this._popupSelector.addEventListener('click', this._closeOverlayHandler);
    document.addEventListener('keydown', this._handleEscClose);
  }

  removeEventListeners() {
    this._closeIcon.removeEventListener('click', this._closeButtonHandler)
    this._popupSelector.removeEventListener('click', this._closeOverlayHandler);
    document.removeEventListener('keydown', this._handleEscClose);
  }
}

export {Popup}