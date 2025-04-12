// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const HF_TOKEN = "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";
const MODEL_URL = "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment";

app.post("/predict", async (req, res) => {
  const { statement } = req.body;

  try {
    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: statement }),
    });

    const result = await response.json();

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    const topResult = result[0][0];
    res.json({
      prediction: topResult.label,
      confidence: (topResult.score * 100).toFixed(2),
    });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch prediction", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
