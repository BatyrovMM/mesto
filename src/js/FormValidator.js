class FormValidator {
  constructor(data, validation) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inputErrorClass = data.inputErrorClass;
    this._validation = validation;
  }
  // Показывает ошибку
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  // Скрывает ошибку
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  // Проверяет на наличие ошибок
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  // Добавляет слушатели
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));

    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this.toggleButtonState(this._hasInvalidInput(inputList), buttonElement);
      });
    });
  }
  
  //Проверка на true/false стандартной валидации
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }
  
  // Чистит ошибки валидации
  clearError(blockPop) {
    const [...error] = blockPop.querySelectorAll('.popup__input-error');
    const [...inputError] = blockPop.querySelectorAll('.popup__input');
    error.forEach(element => element.textContent = '');
    inputError.forEach(element => element.classList.remove('popup__input_invalid'));
  }

  // Включение/выключение кнопки
  toggleButtonState(inputList, buttonElement) {
    buttonElement.disabled = !!inputList;
  }

  //Включение валидации
  enableValidation() {
    this._setEventListeners(this._validation);
  }
}

// Экспорт
export {FormValidator};
