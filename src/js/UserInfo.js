class UserInfo {
  constructor({profileName, profileStatus}) {
    this._profileName = document.querySelector(profileName);
    this._profileStatus = document.querySelector(profileStatus);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  getUserInfo() {
    this._editChange = {};
    this._editChange.nameInput = this._profileName.textContent;
    this._editChange.statusInput = this._profileStatus.textContent;

    return this._editChange;
  }
  
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileStatus.textContent = data.status;
  }
}

export {UserInfo}