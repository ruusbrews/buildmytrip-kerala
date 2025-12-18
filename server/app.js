// /server/app.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// calculate correct number of days
function calculateTripDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end - start;

  // +1 to count days correctly
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

app.post("/buildmytrip-itinerary", async (req, res) => {
  const { destinations = [], startDate, endDate } = req.body;

  // input validation
  if (!startDate || !endDate || destinations.length === 0) {
    return res.status(400).json({ error: "Missing startDate, endDate, or destinations" });
  }

  const tripDays = calculateTripDays(startDate, endDate);

  if (tripDays <= 0) {
    return res.status(400).json({ error: "End date must be after start date." });
  }

  // making destination list
  const destList = destinations
    .map((d, i) => `${i + 1}. ${d.name} (₹${d.price})`)
    .join("\n");

  // insert all user values into prompt!!!
  const userPrompt = `
You are a professional Kerala travel planner creating a clean itinerary.

TRIP DETAILS:
Start date: ${startDate}
End date: ${endDate}
Total duration: ${tripDays} days
Selected destinations:
${destList}

STYLE RULES:
- No asterisks, no hyphens, no Markdown symbols.
- Use travel-agency layout.
- Use “Day 1 — Location (Main Experience)” titles.
- Use short paragraphs, warm and practical tone.
- Include natural timings (morning / afternoon / evening).
- Use INR prices in parentheses, like (₹1500).
- Add tips and optional add-ons.

TASK:
Write a ${tripDays}-day Kerala itinerary covering only the selected destinations.
Do NOT produce more days than ${tripDays}.
Do NOT summarize — write the full day plans.
Do NOT include AI disclaimers.
  `;

  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: "You are a Kerala travel AI that produces accurate, realistic, perfectly structured itineraries." },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.25,
      max_tokens: 1500
    });

    const itineraryText =
      resp.choices?.[0]?.message?.content || "Sorry — no itinerary returned.";

    return res.json({ itinerary: itineraryText });

  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({ error: "OpenAI request failed." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
