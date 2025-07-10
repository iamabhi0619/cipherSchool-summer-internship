
let itemCounter = 4;

function addItem() {
    const list = document.getElementById('itemList');

    const newItem = document.createElement('li');

    newItem.textContent = `New Item ${itemCounter}`;

    list.appendChild(newItem);

    itemCounter++;
}

function removeItem() {
    const list = document.getElementById('itemList');

    if (list.children.length > 0) {
        const lastItem = list.lastElementChild;
        list.removeChild(lastItem);
    } else {
        alert('No items to remove');
    }
}


const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');

addButton.addEventListener('click', addItem);
removeButton.addEventListener('click', removeItem);
