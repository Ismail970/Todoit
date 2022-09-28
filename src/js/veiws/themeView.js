class themeView {
  _themeBtn = document.querySelector(".header__theme-btn");
  _lightThemeIconPath = "icon-sun.svg";
  _darkThemeIconPath = "icon-moon.svg";

  _addHandlerThemeBtn (handler) {
    this._themeBtn.addEventListener("click", handler);
  }

  _switchTheme () {
    document.body.classList.toggle("body-dark");
    this._themeBtn.children[0].src = document.body.classList.contains("body-dark") ? this._lightThemeIconPath : this._darkThemeIconPath;
  }
}

export default new themeView();