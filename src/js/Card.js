// Массив первых шести фотокарточек
const initialCards = [
  {
    name: 'Astronaut',
    link: 'https://images.unsplash.com/photo-1542649761-0bdd3753c8a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Space Shuttle',
    link: 'https://images.unsplash.com/photo-1454789415558-bdda08f4eabb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
  },
  {
    name: 'Far From Home',
    link: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
  },
  {
    name: 'Outer Space',
    link: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1940&q=80'
  },
  {
    name: 'Outer World',
    link: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?ixlib=rb-1.2.1&auto=format&fit=crop&w=733&q=80'
  },
  {
    name: 'Outer Life',
    link: 'https://images.unsplash.com/photo-1447433589675-4aaa569f3e05?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
];

class Card {
  constructor({data, handleCardClick}, template) {
    this._title = data.name;
    this._photo = data.link;
    this._handleCardClick = handleCardClick;
    this._template = template;
  }

  _cardTemplate() {
    const createCards = document
    .querySelector(this._template)
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
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._like();
    });

    // Отвечает за удаление
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._remove()
    });

    // Отвечает за lightBox
    this._element.querySelector('.card__photo').addEventListener('click', () => {
      this._handleCardClick()
    });
  }

  _removeEventListeners() {
    // Отвечает за лайк
    this._element.querySelector('.card__like').removeEventListener('click', () => {
      this._like();
    });

    // Отвечает за удаление
    this._element.querySelector('.card__delete').removeEventListener('click', () => {
      this._remove()
    });

    // Отвечает за lightBox
    this._element.querySelector('.card__photo').removeEventListener('click', () => {
      this._handleCardClick()
    });
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
export {initialCards, Card}