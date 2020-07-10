import {Popup} from './Popup.js'

class PopupWithForm extends Popup {
  constructor(popupSelector, {onSubmit}) {
    super(popupSelector);
    this._onSubmit = onSubmit;
    this._submit = this._submitData.bind(this);
  }
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputValue = {};
    this._inputList.forEach((item) => {
      this._inputValue[item.name] = item.value;
    });
    return this._inputValue;
  }

  open() {
    this.setEventListeners();
    super.open();
  }

  close() {
    this._popupSelector.querySelector('.popup__form').reset();
    this.removeEventListeners();
    super.close();
  }
  
  setEventListeners() {
    this._popupSelector.addEventListener('submit', this._submit);
    super.setEventListeners();
  }

  removeEventListeners() {
    this._popupSelector.removeEventListener('submit', this._submit);
    super.removeEventListeners();
  }

  _submitData(event) {
    event.preventDefault();
    this._onSubmit(this._getInputValues());
  }
}

export {PopupWithForm}