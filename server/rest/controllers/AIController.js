import assistantController from '../ai/assistant/assistant.controller.js'

class AIController {
    async getAIContent(req, res) {
        return assistantController.chat(req, res)
    }
}

export default new AIController()
