import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const userMessage = req.body?.message || "Hello!";
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 또는 "gpt-4"
      messages: [{ role: "user", content: userMessage }],
    });

    res.status(200).json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
  }
}
