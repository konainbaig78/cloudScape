import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Groq from 'groq-sdk'

const app = express()

const PORT = 5000

app.use(cors())
app.use(express.json())

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'CloudScape AI',
  })
})

app.post('/api/explain', async (req, res) => {
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

    res.json({
      answer:
        answer ||
        'No answer generated.',
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      error:
        'AI request failed. Check your GROQ_API_KEY and server logs.',
    })
  }
})

app.listen(PORT, () => {
  console.log(
    `CloudScape API running on http://localhost:${PORT}`
  )
})