// chatbot.js
const chatLog = document.getElementById("chat-log");
const inputField = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

const apiKey = "YOUR_OPENAI_API_KEY";  // Replace with secure backend proxy later

async function sendMessage() {
    const userMessage = inputField.value.trim();
    if (!userMessage) return;

    appendMessage("You", userMessage);
    inputField.value = "";

    const messages = [
        { role: "system", content: "You are a helpful assistant for a construction and contracting business." },
        { role: "user", content: userMessage }
    ];

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: messages
            })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "No response.";
        appendMessage("AI", reply);

    } catch (err) {
        console.error(err);
        appendMessage("AI", "There was an error connecting to OpenAI.");
    }
}

function appendMessage(sender, message) {
    const msg = document.createElement("div");
    msg.className = "chat-message";
    msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(msg);
    chatLog.scrollTop = chatLog.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
