import Groq from "groq-sdk";

export default async function handler(req, res) {
  // Health check
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "CloudScape AI",
    });
  }

  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    // Check API key
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is missing");

      return res.status(500).json({
        error: "GROQ_API_KEY is not configured on Vercel.",
      });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const {
      prompt,
      node,
      architecture,
    } = req.body || {};

    // Validate prompt
    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        error: "Prompt is required.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0.4,
      max_tokens: 500,

      messages: [
        {
          role: "system",
          content: `
You are CloudScape AI.

You are a senior cloud architect helping
a junior developer understand infrastructure.

Explain things clearly and practically.

Use the supplied architecture as the source
of system facts.

Do not invent services, metrics, incidents,
or infrastructure that does not exist.

Keep responses concise and beginner-friendly.
          `,
        },

        {
          role: "user",
          content: JSON.stringify({
            question: prompt,
            selectedNode: node ?? null,
            architecture: architecture ?? null,
          }),
        },
      ],
    });

    const answer =
      completion?.choices?.[0]?.message?.content;

    return res.status(200).json({
      answer: answer || "No answer generated.",
    });

  } catch (error) {
    console.error("CloudScape AI error:", error);

    return res.status(500).json({
      error:
        error?.message ||
        "AI request failed.",
    });
  }
}
