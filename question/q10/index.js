// Counter for new items
let itemCounter = 4;

// Function to add a new item to the list
function addItem() {
    // Get the ul element
    const list = document.getElementById('itemList');
    
    // Create a new li element using DOM methods
    const newItem = document.createElement('li');
    
    // Set the text content for the new item
    newItem.textContent = `New Item ${itemCounter}`;
    
    // Add the new item to the list
    list.appendChild(newItem);
    
    // Increment counter for next item
    itemCounter++;
    
    console.log('Added new item to the list');
}

// Function to remove the last item from the list
function removeItem() {
    // Get the ul element
    const list = document.getElementById('itemList');
    
    // Check if there are items to remove
    if (list.children.length > 0) {
        // Remove the last child element
        const lastItem = list.lastElementChild;
        list.removeChild(lastItem);
        console.log('Removed last item from the list');
    } else {
        console.log('No items to remove');
    }
}

// Alternative add function with more DOM methods
function addItemAdvanced() {
    const list = document.getElementById('itemList');
    
    // Create new li element
    const newItem = document.createElement('li');
    
    // Create text node
    const textNode = document.createTextNode(`Advanced Item ${itemCounter}`);
    
    // Append text node to li element
    newItem.appendChild(textNode);
    
    // Insert at the beginning instead of end
    if (list.firstElementChild) {
        list.insertBefore(newItem, list.firstElementChild);
    } else {
        list.appendChild(newItem);
    }
    
    itemCounter++;
    console.log('Added new item at the beginning of the list');
}

// Function to add item with user input
function addCustomItem() {
    const customText = prompt('Enter text for the new item:');
    
    if (customText && customText.trim() !== '') {
        const list = document.getElementById('itemList');
        const newItem = document.createElement('li');
        newItem.textContent = customText.trim();
        list.appendChild(newItem);
        console.log('Added custom item:', customText);
    }
}

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Get button elements
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');
    
    // Add event listeners
    addButton.addEventListener('click', addItem);
    removeButton.addEventListener('click', removeItem);
    
    console.log('Dynamic list demo ready!');
    console.log('Available functions:');
    console.log('- addItem(): Adds item at the end');
    console.log('- removeItem(): Removes last item');
    console.log('- addItemAdvanced(): Adds item at the beginning');
    console.log('- addCustomItem(): Adds custom item with user input');
});
