function navigateDOM() {
    console.log("=== DOM Navigation ===");
    
    const paragraph1 = document.getElementById('paragraph1');
    const item2 = document.getElementById('item2');
    const list = document.getElementById('list');
    
    console.log("\n--- Using parentNode ---");
    console.log("paragraph1 parent:", paragraph1.parentNode);
    console.log("paragraph1 parent tag name:", paragraph1.parentNode.tagName);
    console.log("item2 parent:", item2.parentNode);
    console.log("item2 parent tag name:", item2.parentNode.tagName);
    
    console.log("\n--- Using childNodes ---");
    const container = document.getElementById('container');
    console.log("container childNodes:", container.childNodes);
    console.log("container childNodes length:", container.childNodes.length);
    
    container.childNodes.forEach((node, index) => {
        if (node.nodeType === 1) { 
            console.log(`Child ${index}: ${node.tagName} - "${node.textContent.trim()}"`);
        } else if (node.nodeType === 3) {
            console.log(`Child ${index}: TEXT NODE - "${node.textContent.trim()}"`);
        }
    });
    
    console.log("\n--- Using nextSibling ---");
    console.log("paragraph1 nextSibling:", paragraph1.nextSibling);
    console.log("paragraph1 nextElementSibling:", paragraph1.nextElementSibling);
    console.log("paragraph1 nextElementSibling text:", paragraph1.nextElementSibling.textContent);
    
    let currentElement = document.getElementById('title');
    let siblingCount = 0;
    
    console.log("\n--- Traversing siblings ---");
    while (currentElement && siblingCount < 5) {
        if (currentElement.nodeType === 1) {
            console.log(`Sibling ${siblingCount}: ${currentElement.tagName} - "${currentElement.textContent.trim()}"`);
        }
        currentElement = currentElement.nextElementSibling;
        siblingCount++;
    }
    
    console.log("\n--- List navigation ---");
    const firstListItem = list.firstElementChild;
    console.log("First list item:", firstListItem.textContent);
    console.log("First item's next sibling:", firstListItem.nextElementSibling.textContent);
    console.log("Last list item:", list.lastElementChild.textContent);
    
    console.log("\n--- previousSibling example ---");
    const lastItem = document.getElementById('item3');
    console.log("Last item's previous sibling:", lastItem.previousElementSibling.textContent);
    
    console.log("\n=== End DOM Navigation ===");
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded. Click the button to see DOM navigation examples.");
    
    console.log("\n--- Immediate DOM check ---");
    const title = document.getElementById('title');
    console.log("Title element:", title);
    console.log("Title parent:", title.parentNode.id);
    console.log("Title text:", title.textContent);
});
