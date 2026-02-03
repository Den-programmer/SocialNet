import { Groq } from 'groq-sdk'
import { StandartRes, catchRes } from '../routes/responses/responses.js'

let groqClient = null

const getGroqClient = () => {
    if (!groqClient) {
        groqClient = new Groq({
            apiKey: process.env.AI_API_KEY,
            withCredentials: true
        })
    }
    return groqClient
}

class AIController {
    async getAIContent(req, res) {
        try {
            const { content } = req.body

            if (!content || !String(content).trim()) {
                return res
                    .status(400)
                    .json(new StandartRes(1, 'Content parameter is required'))
            }

            if (!process.env.AI_API_KEY) {
                return res
                    .status(500)
                    .json(new StandartRes(1, 'AI_API_KEY is not configured on the server.'))
            }

            const completion = await getGroqClient().chat.completions.create({
                model: 'groq/compound',
                messages: [{ role: 'user', content }]
            })

            res.json(
                new StandartRes(0, '', {
                    content: completion.choices[0]?.message?.content
                })
            )
        } catch (e) {
            console.error('AI completion failed:', e)
            res.status(500).json(catchRes)
        }
    }
}
export default new AIController()
