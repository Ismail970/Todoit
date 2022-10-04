import { getLocalStorage } from "../helpers";

class todoView {
  _newTodoInput = document.getElementById("new-todo");
  _itemsInfo = document.querySelector(".items-info");
  _itemsLeft = document.getElementById('items-num');
  _parentEl = document.querySelector(".items-container__todo-items");
  _data;
  _id;
  _state;

  render (data, id, state = "active") {
    // if input is empty return
    if (!data.trim()) return;

    this._data = data;
    this._id = id;
    this._state = state;

    this._generateRenderMarkup(id, data, state);

    this.setLocalStorage(id, data, state);
  }

  _generateRenderMarkup (id, data, state) {
    const markup = this._generateMarkup(id, data, state);

    this._newTodoInput.value = "";
    this._itemsInfo.insertAdjacentHTML("beforebegin", markup);
  }

  _generateMarkup (id, data, state) {
    return `
      <label for="${id}" class="item-lable" data-state="${state}">
        <input type="checkbox" name="Todo item" id="${id}">
        <span></span>
        <p>${data}</p>
        <button id="todo-item-btn"><img src="icon-cross.svg" alt="cross"></button>
      </label>
    `;
  }

  _generateMarkupItemsLeft () {
    let itemsLeft = 0;
    Array.from(this._parentEl.children).forEach(el => el.classList.contains("item-lable") && itemsLeft++);
    this._itemsLeft.textContent = itemsLeft;
  }

  _addHandlerRender (handler) {
    this._newTodoInput.addEventListener("keyup", function (e) {
      if (e.key !== "Enter") return;

      handler();
    });
  }

  _addHandlerItemsLeft (handler) {
    window.addEventListener("load", handler);
  }

  _addHandlerTodoItems (handler) {
    const self = this;
    this._parentEl.addEventListener("click", function (e) {
      // Remove todo
      if (e.target.closest('#todo-item-btn')) {
        self.removeFromLocalStorage(e.target.closest(".item-lable").getAttribute("for"));

        e.target.closest(".item-lable").remove();
      }

      // Clear completed todos
      if (e.target.classList.contains("items-clear")) {
        document.querySelectorAll(".item-lable").forEach(el => {
          if (el.dataset.state === "completed") self.removeFromLocalStorage(el.getAttribute("for"));
        });

        Array.from(this.children).forEach(el => el.dataset.state === "completed" && el.remove());
      }

      handler();
    });
  }

  _addHandlerCheckBox () {
    this._parentEl.addEventListener("change", function (e) {
      let items = getLocalStorage("todo", []);

      // set attr based on state
      e.target.parentElement.setAttribute("data-state", e.target.checked ? "completed" : "active");
      e.target.parentElement.querySelector("p").classList.toggle("item-lable__todo-checked");

      // change state in local storage
      items.forEach(item => {
        if (item.id === e.target.parentElement.getAttribute("for")) {
          item.state = e.target.parentElement.dataset.state;
        }
      });

      // reset local storage
      localStorage.setItem("todo", JSON.stringify(items));
    });
  }

  setLocalStorage (id, data, state) {
    const todos = { id, data, state };
    const items = getLocalStorage("todo", []);
    items.push(todos);
    localStorage.setItem("todo", JSON.stringify(items));
  }

  removeFromLocalStorage (id) {
    let items = getLocalStorage("todo", []);
    items = items.filter(item => item.id !== id);
    localStorage.setItem("todo", JSON.stringify(items));
  }

  renderLocalStorage () {
    const items = getLocalStorage("todo", []);
    if (items.length === 0) return;
    items.forEach(item => {
      // generate data from local storage
      this._generateRenderMarkup(item.id, item.data, item.state);
      // generate data state from loacl storage
      if (item.state !== "completed") return;
      document.querySelectorAll(".item-lable").forEach(el => {
        if (el.dataset.state !== "completed") return;
        el.querySelector("p").classList.add("item-lable__todo-checked");
        // check completed
        el.firstElementChild.setAttribute("checked", undefined);
      });
    });
  }
}

export default new todoView();