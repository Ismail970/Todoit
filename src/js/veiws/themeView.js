import { getLocalStorage } from "../helpers";

class themeView {
  _themeBtn = document.querySelector(".header__theme-btn");
  _lightThemeIconPath = "icon-sun.svg";
  _darkThemeIconPath = "icon-moon.svg";
  _isDark = false;

  _addHandlerThemeBtn (handler) {
    this._themeBtn.addEventListener("click", handler);
  }

  _switchTheme () {
    document.body.classList.toggle("body-dark");
    this._themeBtn.children[0].src = document.body.classList.contains("body-dark") ? this._lightThemeIconPath : this._darkThemeIconPath;

    localStorage.setItem("theme", document.body.classList.contains("body-dark") ? JSON.stringify(this._isDark = true) : JSON.stringify(this._isDark = false));
  }

  _renderFromLocalStorage () {
    this._isDark = getLocalStorage("theme", false);
    if (this._isDark) {
      document.body.classList.add("body-dark");
      this._themeBtn.children[0].src = this._lightThemeIconPath;
    }
  }
}

export default new themeView();