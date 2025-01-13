import {setItem} from './local-storage.js';

export function countElement(todos) {
    countItem(todos);
    countItemChecked(todos);
}

function countItem(todos) {
    let number = todos.length;
    const valueAll = document.querySelector(".value-all");
    valueAll.textContent = `All: ${number}`;
    setItem(todos);
}

function countItemChecked(todos) {
    const numberChecked = todos.filter(({ isChecked }) => isChecked).length;
    const valueCompleted = document.querySelector(".value-completed");
    valueCompleted.textContent = `Completed: ${numberChecked}`;
    setItem(todos);
}
