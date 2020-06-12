// Показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// Скрывает ошибку
const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.textContent = '';
};

// Проверяет на наличие ошибок
const checkInputValidity = (formElement, inputElement, options) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

// Включение/выключение кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (inputList) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

// Добавляет слушатели
const setEventListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));

  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  toggleButtonState(hasInvalidInput(inputList), buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(hasInvalidInput(inputList), buttonElement);
    });
  });
};

// Чистит ошибки валидации
function clearError(blockPop) {
  const [...error] = blockPop.querySelectorAll('.popup__input-error');
  const [...inputError] = blockPop.querySelectorAll('.popup__input');
  error.forEach(element => element.textContent = '');
  inputError.forEach(element => element.classList.remove('popup__input_invalid'));
};

//Включение валидации
const enableValidation = (options) => {
  const popupForm = Array.from(document.querySelectorAll(options.formSelector));
  popupForm.forEach((formElement) => {
    setEventListeners(formElement, options);
  });
};

//Проверка на true/false стандартной валидации
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};