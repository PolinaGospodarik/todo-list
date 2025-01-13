export function createElement(tag, className, type, text) {
    const element = document.createElement(tag);
    if (type !== null) {
        element.setAttribute("type", type);
    }
    if (className !== null) {
        element.classList.add(className);
    }
    if (text !== null) {
        element.innerHTML = text;
    }
    return element;
}
