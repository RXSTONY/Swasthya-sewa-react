function sendMessage() {
  const userInput = document.getElementById("userInput");
  const message = userInput.value.trim();
  if (message === "") return;

  appendMessage("You", message, "user");
  userInput.value = "";

  fetch("/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: message })
  })
  .then(response => response.json())
  .then(data => {
    appendMessage("Bot", data.reply, "bot");
  })
  .catch(error => {
    appendMessage("Bot", "Sorry, something went wrong.", "bot");
    console.error("Error:", error);
  });
}

function appendMessage(sender, text, className) {
  const chatlog = document.getElementById("chatlog");
  const messageDiv = document.createElement("div");
  messageDiv.className = "message " + className;
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatlog.appendChild(messageDiv);
  chatlog.scrollTop = chatlog.scrollHeight;
}
