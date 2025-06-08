// chatbot.js
// chatbot.js
const chatLog = document.getElementById("chat-log");
const inputField = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

async function sendMessage() {
    const userInput = inputField.value.trim();
    if (!userInput) return;

    appendMessage("You", userInput);
    inputField.value = "";

    try {
        const res = await fetch("https://your-replit-url.repl.co/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_input: userInput })
        });

        const data = await res.json();
        appendMessage("Assistant", data.reply || "No response.");
    } catch (err) {
        console.error(err);
        appendMessage("Assistant", "❌ Error reaching assistant.");
    }
}

function appendMessage(sender, text) {
    const msg = document.createElement("div");
    msg.className = "chat-message";
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});


