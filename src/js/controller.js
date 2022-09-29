import todoVeiw from "./veiws/todoVeiw";
import optionsView from "./veiws/optionsView";
import themeView from "./veiws/themeView";


const controlInputTodo = function () {
  const id = Date.now().toString();
  // Render todo
  todoVeiw.render(todoVeiw._newTodoInput.value, id);

  // Return active class to all button
  optionsView._changeActiveBtn();

  // Calculate left todos
  controlItemsLeft();

};

const controlItemsLeft = function () {
  // Generate left todos
  todoVeiw._generateMarkupItemsLeft();
};

const controlThemeBtn = function () {
  themeView._switchTheme();
};

const controlSetLocalStorage = function () {
  // Display from local storage
  todoVeiw.renderLocalStorage();
  themeView._renderFromLocalStorage();
  controlInputTodo();
};

// events
const init = function () {
  todoVeiw._addHandlerRender(controlInputTodo);
  todoVeiw._addHandlerTodoItems(controlItemsLeft);
  todoVeiw._addHandlerItemsLeft(controlItemsLeft);
  todoVeiw._addHandlerItemsLeft(controlSetLocalStorage);
  todoVeiw._addHandlerCheckBox();
  optionsView._addHandlerOptions();
  themeView._addHandlerThemeBtn(controlThemeBtn);
};
init();