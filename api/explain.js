import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return res.json({
      ok: true,
      service: 'CloudScape AI',
    })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed.',
    })
  }

  try {
    const {
      prompt,
      node,
      architecture,
    } = req.body

    if (!prompt?.trim()) {
      return res.status(400).json({
        error: 'Prompt is required.',
      })
    }

    const completion =
      await groq.chat.completions.create({
        model: 'openai/gpt-oss-120b',
        temperature: 0.4,
        max_tokens: 500,
        messages: [
          {
            role: 'system',
            content: `
You are CloudScape AI.

You are a senior cloud architect helping
a junior developer understand infrastructure.

Explain things clearly and practically.

Use the supplied architecture as the source
of system facts.

Do not invent services, metrics, incidents,
or infrastructure that does not exist.

Keep responses concise.
            `,
          },
          {
            role: 'user',
            content: JSON.stringify({
              question: prompt,
              selectedNode: node ?? null,
              architecture,
            }),
          },
        ],
      })

    const answer =
      completion.choices?.[0]?.message?.content

    return res.json({
      answer: answer || 'No answer generated.',
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      error: 'AI request failed.',
    })
  }
}