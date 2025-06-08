// server.js — Node.js Express Proxy for OpenAI API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY  // store in .env or Replit Secrets
});
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  try {
    const userInput = req.body.user_input || "";

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an assistant helping a contractor with coding, business setup, and federal programs." },
        { role: "user", content: userInput }
      ]
    });

    const reply = completion.data.choices[0].message.content;
    res.json({ reply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ reply: "⚠️ API error." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
