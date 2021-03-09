let canvas = document.getElementById("canvas");
let addButtonButton = document.getElementById("addButton");
let editButton = document.getElementById("editButton");
let insertTextButton = document.getElementById("insertText");
let onClickButton = document.getElementById("onClick");
let customButton = document.getElementById("custom");
let insertTextPlaceHolder;
let inputText;
let textarea;
let customT;

function addButton() {
    let button = document.createElement("button");
    button.innerHTML = "Button";
    button.classList = "btn btn-outline-secondary button"
    canvas.appendChild(button);
}

function remove() {
    let last = canvas.lastElementChild;
    canvas.removeChild(last);
}

function editText() {
    let input = document.createElement("input");
    input.style.width = "30%";
    input.style.fontSize = "1.7em";
    input.classList = "form-control";
    input.placeholder = "Enter the text";
    replaceElement(editButton, input);
    inputText = input;
    inputText.focus();
}

function replaceElement(element1, element2) {
    element1.parentNode.replaceChild(element2, element1);
}

function insertNewLine() {
    let br = document.createElement("br");
    canvas.appendChild(br);
}

function insertText() {
    let input = document.createElement("input");
    input.style.width = "30%";
    input.style.fontSize = "1.7em";
    input.classList = "form-control";
    input.placeholder = "Enter the text";
    replaceElement(insertTextButton, input);
    insertTextPlaceHolder = input;
    insertTextPlaceHolder.focus();
}

function setText() {
    let last = canvas.lastElementChild;
    last.innerHTML = inputText.value;
    let button = document.createElement("button");
    button.id = "editButton";
    button.classList = "btn btn-outline-secondary button";
    button.innerHTML = "Edit Text";
    button.onclick = editText;
    replaceElement(inputText, button);
    inputText = null;
    editButton = button;
}

function addText() {
    let p = document.createElement("p");
    p.innerHTML = insertTextPlaceHolder.value;
    p.style.fontSize = "1.7em";
    canvas.appendChild(p);
    let button = document.createElement("button");
    button.id = "insertText";
    button.classList = "btn btn-outline-secondary button";
    button.innerHTML = "Insert Text";
    button.onclick = insertText;
    replaceElement(insertTextPlaceHolder, button);
    insertTextButton = button;
    insertTextPlaceHolder = null;
}

function onClick() {
    let ta = document.createElement("textarea");
    ta.style.fontSize = "1.4em";
    ta.style.borderRadius = "15px";
    ta.rows = 10;
    ta.classList = "form-control";
    ta.placeholder = "Enter JavaScript Code (Shift+Enter to submit or cancel)";
    replaceElement(onClickButton, ta);
    textarea = ta;
    textarea.focus();
}

function setOnClick() {
    let last = canvas.lastElementChild;
    last.onclick = new Function(textarea.value);
    let button = document.createElement("button");
    button.classList = "btn btn-outline-secondary button";
    button.onclick = onClick;
    button.innerHTML = "On Click";
    replaceElement(textarea, button);
    onClickButton = button;
    textarea = null;
}

function custom() {
    let ta = document.createElement("textarea");
    ta.style.fontSize = "1.4em";
    ta.style.borderRadius = "15px";
    ta.rows = 10;
    ta.classList = "form-control";
    ta.placeholder = "Enter JavaScript Code (Shift+Enter to submit or cancel)";
    replaceElement(customButton, ta);
    customT = ta;
    customT.focus();
}

function createCustom() {
    canvas.innerHTML += customT.value;
    let button = document.createElement("button");
    button.classList = "btn btn-outline-secondary button";
    button.onclick = custom;
    button.innerHTML = "Custom";
    replaceElement(customT, button);
    customButton = button;
    customT = null;
}

document.onkeydown = async function(e) {
    if (!e) e = window.event;
    var keyCode = e.code || e.key;
    if (keyCode == "Enter" && !e.shiftKey) {
        if (inputText != null) {
            setText();
        } else if (insertTextPlaceHolder != null) {
            addText();
        }
    } else if (keyCode == "Enter" && e.shiftKey) {
        if (textarea != null) {
            setOnClick();
        } else if (custom != null) {
            createCustom();
        }
    }
}
