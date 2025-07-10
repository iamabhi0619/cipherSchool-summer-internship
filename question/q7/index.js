function changeMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "The text has been changed to xyz!";
}

function resetMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "This is the original message text.";
}