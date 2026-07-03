import aiService from '../ai/services/ai.service.js'
import { StandartRes, catchRes } from '../routes/responses/responses.js'

class AIController {
    async getAIContent(req, res) {
        try {
            const { content } = req.body

            if (!content?.trim()) {
                return res.status(400).json(
                    new StandartRes(1, 'Content is required')
                )
            }

            const answer = await aiService.chat(content)

            return res.json(
                new StandartRes(0, '', {
                    content: answer
                })
            )
        } catch (e) {
            console.error(e)
            res.status(500).json(catchRes)
        }
    }
}

export default new AIController()