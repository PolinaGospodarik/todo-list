"use strict";

import {createElement} from './elements.js';
import {countElement} from './counters.js';
import {setItem} from './local-storage.js';

export function createTodoItem(object, todos, root) {
    let todoList = root.querySelector(".todo-list");

    const todoItem = createElement("li", "todo-item", null, null);
    if (object.isChecked) {
        todoItem.classList.toggle("todo-item-active");
    }
    const ended = localStorage.getItem("ended");
    if (ended === "1" && !object.isChecked) {
        todoItem.classList.add("hidden");
    }

    const searchText = localStorage.getItem("searchText");
    if (searchText != null) {
        if (object.text.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            todoItem.classList.remove("hidden");
        } else {
            todoItem.classList.add("hidden");
        }
    }
    todoList.append(todoItem);

    const todoForm = createElement("form", "todo-form", null, null);
    todoItem.append(todoForm);

    const todoLeft = createElement("div", "todo-left", null, null);
    todoForm.append(todoLeft);

    const checkbox = createElement("input", "todo-checkbox", "checkbox", null);
    todoLeft.append(checkbox);

    checkbox.checked = object.isChecked;
    checkbox.addEventListener("change", function () {
        object.isChecked = checkbox.checked;
        todoItem.classList.toggle("todo-item-active", object.isChecked);
        countElement(todos);
        setItem(todos);
    });

    const text = createElement("textarea", "todo-text", "text", object.text);
    todoLeft.append(text);

    const todoRight = createElement("div", "todo-right", null, null);
    todoForm.append(todoRight);

    const deleted = createElement("button", "todo-delete", "submit", "✕");
    todoRight.append(deleted);

    deleted.addEventListener("click", function (event) {
        event.target.closest('.todo-item').remove();
        todos = todos.filter(item => item.id !== object.id);
        countElement(todos);
        setItem(todos);
    });

    const date = createElement("input", "todo-date", "text", object.date);
    date.value = object.date;
    todoRight.append(date);
}
