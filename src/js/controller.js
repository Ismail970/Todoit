import todoVeiw from "./veiws/todoVeiw";
import optionsView from "./veiws/optionsView";
import themeView from "./veiws/themeView";

const controlInputTodo = function () {
  // Render todo
  todoVeiw.render(todoVeiw._newTodoInput.value);

  // Return active class to all button
  optionsView._changeActiveBtn();

  // Calculate left todos
  controlItemsLeft();

};

const controlItemsLeft = function () {
  // Generate left todos
  todoVeiw._generateMarkupItemsLeft(todoVeiw._calcItems());
};

const controlThemeBtn = function () {
  themeView._switchTheme();
};

const init = function () {
  todoVeiw._addHandlerRender(controlInputTodo);
  todoVeiw._addHandlerTodoItems(controlItemsLeft);
  todoVeiw._addHandlerItemsLeft(controlItemsLeft);
  todoVeiw._addHandlerCheckBox();
  optionsView._addHandlerOptions();
  themeView._addHandlerThemeBtn(controlThemeBtn);
};
init();