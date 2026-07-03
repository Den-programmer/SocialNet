class OllamaProvider {
    constructor() {
        this.url = process.env.OLLAMA_URL || 'http://localhost:11434'
        this.model = process.env.OLLAMA_MODEL || 'qwen3'
    }

    async chat(messages) {
        const response = await fetch(`${this.url}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.model,
                messages,
                stream: false
            })
        })

        if (!response.ok) {
            throw new Error(await response.text())
        }

        const data = await response.json()

        return data.message.content
    }
}

export default new OllamaProvider()