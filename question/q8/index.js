
function update() {
    const inputField = document.getElementById('textInput');
    const displayParagraph = document.getElementById('display');
    const inputValue = inputField.value;

    if (inputValue.trim() === '') {
        displayParagraph.textContent = 'Please enter some text first!';
    } else {
        displayParagraph.textContent = inputValue;
    }
}

function clear() {
    const inputField = document.getElementById('textInput');
    const displayParagraph = document.getElementById('display');

    inputField.value = '';
    displayParagraph.textContent = 'Text appeared here...';
}

const updateButton = document.getElementById('update');
const clearButton = document.getElementById('clear');
const inputField = document.getElementById('textInput');


updateButton.addEventListener('click', update);
clearButton.addEventListener('click', clear);