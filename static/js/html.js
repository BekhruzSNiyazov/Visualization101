/*
* Back end for html.html
* Handles:
*   - the creation of the webpage
 */

let canvas = document.getElementById("canvas");
let editButton = document.getElementById("editButton");
let insertTextButton = document.getElementById("insertText");
let onClickButton = document.getElementById("onClick");
let customButton = document.getElementById("custom");
let insertTextPlaceHolder;
let inputText;
let textarea;
let customT;
let scripts = "";
let n = 1;

function addButton() {
    let button = document.createElement("button");
    button.innerHTML = "Button";
    button.classList = "btn btn-outline-secondary button";
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
    input.style.position = "fixed";
    input.style.float = "center";
    input.style.marginBottom = "50%";
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
    input.style.position = "fixed";
    input.style.float = "center";
    input.style.marginBottom = "50%";
    input.classList = "form-control";
    input.placeholder = "Enter the text";
    replaceElement(insertTextButton, input);
    insertTextPlaceHolder = input;
    insertTextPlaceHolder.focus();
}

function setText() {
    let button = document.createElement("button");
    button.id = "editButton";
    button.classList = "btn btn-outline-secondary button";
    button.innerHTML = "Edit Text";
    button.onclick = editText;
    replaceElement(inputText, button);
    editButton = button;
    let last = canvas.lastElementChild;
    last.innerHTML = inputText.value;
    inputText = null;
}

function addText() {
    let button = document.createElement("button");
    button.id = "insertText";
    button.classList = "btn btn-outline-secondary button";
    button.innerHTML = "Insert Text";
    button.onclick = insertText;
    replaceElement(insertTextPlaceHolder, button);
    insertTextButton = button;
    let p = document.createElement("p");
    p.innerHTML = insertTextPlaceHolder.value;
    p.style.fontSize = "1.7em";
    canvas.appendChild(p);
    insertTextPlaceHolder = null;
}

function onClick() {
    let ta = document.createElement("textarea");
    ta.style.fontSize = "1.4em";
    ta.style.position = "fixed";
    ta.style.float = "center";
    ta.style.marginBottom = "50%";
    ta.rows = 10;
    ta.classList = "form-control";
    ta.placeholder = "Enter JavaScript Code (Shift+Enter to submit or cancel)";
    replaceElement(onClickButton, ta);
    textarea = ta;
    textarea.focus();
}

function setOnClick() {
    let button = document.createElement("button");
    button.classList = "btn btn-outline-secondary button";
    button.onclick = onClick;
    button.id = "onClick";
    button.innerHTML = "On Click";
    replaceElement(textarea, button);
    onClickButton = button;
    let last = canvas.lastElementChild;
    last.onclick = new Function(textarea.value);
    last.id = "button" + n;
    scripts += `document.getElementById("${last.id}").onclick = function() {\n\t` + textarea.value + "\n}";
    textarea = null;
}

function custom() {
    let ta = document.createElement("textarea");
    ta.style.fontSize = "1.4em";
    ta.style.position = "fixed";
    ta.style.float = "center";
    ta.style.marginBottom = "50%";
    ta.rows = 10;
    ta.classList = "form-control";
    ta.placeholder = "Enter HTML Code (Shift+Enter to submit or cancel)";
    replaceElement(customButton, ta);
    customT = ta;
    customT.focus();
}

function createCustom() {
    let button = document.createElement("button");
    button.classList = "btn btn-outline-secondary button";
    button.onclick = custom;
    button.id = "custom";
    button.innerHTML = "Custom";
    replaceElement(customT, button);
    customButton = button;
    canvas.innerHTML += customT.value;
    customT = null;
}

function download() {
    let contents = `<!DOCTYPE html>
<html>
    <head>
    <title></title>
    <style>
        .btn-primary, .btn-primary:hover,.btn-primary:active,.btn-primary:visited {
            background-color:rgb(141, 138, 138) !important;
            border-color:rgb(110, 107, 107) !important;
            font-size: 3vh !important;
        }
        .b {
            color: gray;
            border-color:gray;
        }
        .b:hover {
            color: whitesmoke;
        }
        .button {
            margin: 1%;
        }
    </style>
    <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css' rel='stylesheet' integrity='sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl' crossorigin='anonymous'>
    <script src='https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js' integrity='sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0' crossorigin='anonymous'></script>
    </head>
    <body>
        <center>
            ${canvas.innerHTML}
        </center>
        <script>
            ${scripts}
        </script>
    </body>
</html>`;
    let element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(contents));
    element.setAttribute('download', "document.html");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function clear() {
    document.getElementById("canvas").innerHTML = "";
    scripts = "";
    n = 0;
}

document.onkeydown = async function (e) {
    if (!e) e = window.event;
    let keyCode = e.code || e.key;
    if (keyCode === "Enter" && !e.shiftKey) {
        if (inputText != null) {
            setText();
        } else if (insertTextPlaceHolder != null) {
            addText();
        }
    } else if (keyCode === "Enter" && e.shiftKey) {
        if (textarea != null) {
            setOnClick();
        } else if (custom != null) {
            createCustom();
        }
    }
}
