class optionsView {
  _parentEl = document.querySelector(".items-container__options");

  _addHandlerOptions () {
    this._parentEl.addEventListener("click", function (e) {
      if (!e.target.classList.contains("items-container__options__btn")) return;

      Array.from(this.children).forEach(el => el.classList.remove("items-container__options__active"));

      e.target.classList.add("items-container__options__active");

      document.querySelectorAll(".item-lable").forEach(el => {
        // Show all
        el.style.removeProperty("display");

        if (el.dataset.state === e.target.textContent.toLowerCase() || e.target.textContent.toLowerCase() === "all") return;

        // Hide selected
        el.style.display = "none";
      });
    });
  };

  _changeActiveBtn () {
    Array.from(document.querySelector(".items-container__options").children).forEach(el => el.classList.remove("items-container__options__active"));

    document.querySelector(".items-container__options").children[0].classList.add("items-container__options__active");
  }
}

export default new optionsView();