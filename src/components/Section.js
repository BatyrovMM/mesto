class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, place) {
    if (place === 'before') {
      this._containerSelector.prepend(element);
    } else {
      this._containerSelector.append(element);
    }
  }
}

export {Section}