
export function setItem(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function getItem() {
    return JSON.parse(localStorage.getItem("todos")) || [];
}
