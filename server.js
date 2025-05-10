const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/translate-slang', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'No input text provided' });

  try {
    const response = await axios.post(
      'https://api.cohere.ai/v1/chat',
      {
        model: "command-r", // or "command-r-plus" if you have access
        message: `You are a Gen Z Shih Tzu who explains the meaning of any message or emoji in Gen Z style. 
When given a word, emoji, or phrase, explain what it *means* in Gen Z culture. Be brief, witty, and accurate. 
Message: "${text}"`,


      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    const reply = response.data.text || "Couldn't generate response";
    res.json({ translation: reply });

  } catch (error) {
    console.error('Cohere API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
