class todoView {
  _newTodoInput = document.getElementById("new-todo");
  _itemsInfo = document.querySelector(".items-info");
  _itemsLeft = document.getElementById('items-num');
  _parentEl = document.querySelector(".items-container__todo-items");
  _data;

  render (data) {
    this._data = data;
    let todoId = Date.now();

    const markup = this._generateMarkup(data, todoId);

    this._newTodoInput.value = "";
    this._itemsInfo.insertAdjacentHTML("beforebegin", markup);
  }

  _generateMarkup (data, todoId) {
    return `
      <label for="todo-item${todoId}" class="item-lable" data-state="active">
        <input type="checkbox" name="Todo item" id="todo-item${todoId}">
        <span></span>
        <p>${data}</p>
        <button id="todo-item-btn"><img src="icon-cross.svg" alt="cross"></button>
      </label>
    `;
  }

  _generateMarkupItemsLeft (itemsLeft) {
    this._itemsLeft.textContent = itemsLeft;
  }

  _calcItems () {
    let itemsLeft = 0;
    Array.from(this._parentEl.children).forEach(el => el.classList.contains("item-lable") && itemsLeft++);
    return itemsLeft;
  }

  _addHandlerItemsLeft (handler) {
    window.addEventListener("load", handler);
  }

  _addHandlerRender (handler) {
    this._newTodoInput.addEventListener("keyup", function (e) {
      if (e.key !== "Enter") return;

      handler();
    });
  }

  _addHandlerTodoItems (handler) {
    this._parentEl.addEventListener("click", function (e) {
      // Remove todo
      e.target.closest('#todo-item-btn') && e.target.closest(".item-lable").remove();

      // Clear completed todos
      e.target.classList.contains("items-clear") && Array.from(this.children).forEach(el => el.dataset.state === "completed" && el.remove());

      handler();
    });
  }

  _addHandlerCheckBox () {
    this._parentEl.addEventListener("change", function (e) {
      e.target.parentElement.querySelector("p").classList.remove("item-lable__todo-checked");
      e.target.parentElement.setAttribute("data-state", "active");

      if (!e.target.checked) return;

      e.target.parentElement.querySelector("p").classList.add("item-lable__todo-checked");
      e.target.parentElement.setAttribute("data-state", "completed");
    });
  }
}

export default new todoView();