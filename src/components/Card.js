class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._title = data.name;
    this._photo = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._like = this._like.bind(this);
    this._remove = this._remove.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
  }

  _cardTemplate() {
    const createCards = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true)

    this._element = createCards;
    return this._element;
  }
  
  
  _like() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _remove() {
    this._removeEventListeners()
    this._element.remove()
    this._element = null;
  }

  _setEventListeners() {
    // Отвечает за лайк
    this._element.querySelector('.card__like').addEventListener('click', this._like)

    // Отвечает за удаление
    this._element.querySelector('.card__delete').addEventListener('click', this._remove)

    // Отвечает за lightBox
    this._element.querySelector('.card__photo').addEventListener('click', this._handleCardClick)
  }

  _removeEventListeners() {
    // Отвечает за лайк
    this._element.querySelector('.card__like').removeEventListener('click', this._like)

    // Отвечает за удаление
    this._element.querySelector('.card__delete').removeEventListener('click', this._remove)
    
    // Отвечает за lightBox
    this._element.querySelector('.card__photo').removeEventListener('click', this._handleCardClick)
  }

  newCard() {
    this._cardTemplate();
    this._setEventListeners();
    const cardPhoto = this._element.querySelector('.card__photo');
    cardPhoto.src = this._photo;
    cardPhoto.alt = this._title;
    this._element.querySelector('.card__photo-name').textContent = this._title;

    return this._element;
  }
}

// Экспорт
export {Card}