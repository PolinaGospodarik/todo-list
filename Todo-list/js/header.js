import {createElement} from './elements.js';
import {countElement} from './counters.js';
import {setItem} from './local-storage.js';
import {createTodoItem} from './todo-list.js';

export function createHeader(root, todos, dateFormat) {
    const wrap = createElement("div", "wrap", null, null);
    root.append(wrap);

    const container = createElement("div", "container", null, null);
    wrap.append(container);

    const header = createElement("header", "header", null, null);
    container.append(header);

    const headerForm = createElement("form", "header-form", null, null);
    header.append(headerForm);

    const headerInput = createElement("input", "enter", "text", null);
    headerInput.setAttribute("placeholder", "Enter todo...");
    headerForm.append(headerInput);

    const headerSubmit = createElement("button", "add", "submit", "+");
    headerForm.append(headerSubmit);

    headerSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        let text = headerInput.value;
        if (text === "") {
            headerInput.setAttribute("placeholder", "field should not be empty");
        } else {
            const todo = {
                id: Date.now(),
                text: headerInput.value,
                date: dateFormat,
                isChecked: false
            };
            todos.push(todo);
            setItem(todos);
            createTodoItem(todo, todos, root);
            headerInput.value = "";
        }
        countElement(todos);
    });

    const deleteAll = createElement("button", "header-button", null, "Delete All");
    header.append(deleteAll);

    deleteAll.addEventListener("click", function () {
        todoList.innerText = "";
        todos = [];
        countElement(todos);
        setItem(todos);
    });

    const deleteLast = createElement("button", "header-button", null, "Delete Last");
    header.append(deleteLast);

    deleteLast.addEventListener("click", function () {
        const lastItem = todoList.querySelector("li:last-child");
        if (lastItem) {
            todoList.removeChild(lastItem);
        }
        todos.pop();
        setItem(todos);
        countElement(todos);
    });

    const navigation = createElement("nav", "navigation", null, null);
    container.append(navigation);

    const valueContainer = createElement("div", "navigation-value", null, null);
    navigation.append(valueContainer);

    const valueAll = createElement("span", "value-all", null, "All: 0");
    valueContainer.append(valueAll);

    const valueCompleted = createElement("span", "value-completed", null, "Completed: 0");
    valueContainer.append(valueCompleted);

    let showAll = createElement("button", "navigation-button", null, "Show All");
    showAll.id = "showAll";
    navigation.append(showAll);

    showAll.addEventListener("click", function () {
        const todoItems = todoList.querySelectorAll(".todo-item");

        for (let i = 0; i < todos.length; i++) {
            todoItems[i].classList.remove("hidden");
        }
        localStorage.setItem("ended", "0");

        search(todoList.querySelectorAll(".todo-item"));
    });

    let showCompleted = createElement("button", "navigation-button", null, "Show Completed");
    showCompleted.id = "showCompleted";
    navigation.append(showCompleted);

    showCompleted.addEventListener("click", function () {
        const todoItems = root.querySelectorAll(".todo-item");
        todos.forEach((todo, i) => {
            if (todo.isChecked) {
                todoItems[i].classList.remove("hidden");
            } else {
                todoItems[i].classList.add("hidden");
            }
        });
        localStorage.setItem("ended", "1");

        search(todoList.querySelectorAll(".todo-item"));
    });

    const navigationForm = createElement("form", "navigation-form", null, null);
    navigation.append(navigationForm);

    const navigationInput = createElement("input", "search", "text", null);
    navigationInput.value = localStorage.getItem("searchText");
    navigationInput.setAttribute("placeholder", "Search ...");
    navigationForm.append(navigationInput);

    navigationInput.addEventListener("input", function (event) {
        event.preventDefault();
        localStorage.setItem("searchText", navigationInput.value);

        search(todoList.querySelectorAll(".todo-item"));
    });

    let todoList = createElement("ul", "todo-list", null, null);
    container.append(todoList);
}

function search(items) {
    const searchText = localStorage.getItem("searchText");
    const ended = localStorage.getItem("ended");

    items.forEach(item => {
        if ((ended === "1" && item.querySelector(".todo-checkbox").checked) || ended !== "1") {
            if (item.textContent.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        }
    });
}
