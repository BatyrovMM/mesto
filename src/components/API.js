export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}users/me`, {
      headers: this.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}cards`, {
      method: 'GET',
      headers: this.headers,
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`error${res.status}`);
    });
  }

  // другие методы работы с API
}
