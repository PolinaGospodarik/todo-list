"use strict";

import {createHeader} from './header.js';
import {getItem} from './local-storage.js';
import {createTodoItem} from './todo-list.js';
import {countElement} from './counters.js';

const root = document.querySelector("#root");

let todos = getItem();
let dateNow = new Date();
const dateFormat = new Intl.DateTimeFormat('ru-RU').format(dateNow);

createHeader(root, todos, dateFormat);

todos.forEach(todo => createTodoItem(todo, todos, root));
countElement(todos);
