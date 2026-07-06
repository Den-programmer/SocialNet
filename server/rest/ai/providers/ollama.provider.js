class OllamaProvider {
    constructor() {
        this.url = process.env.OLLAMA_URL || 'http://localhost:11434'
        this.model = process.env.OLLAMA_MODEL || 'qwen3'
    }

    async chat(messages) {
        const res = await fetch(`${this.url}/api/chat`, {
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

        if (!res.ok) {
            throw new Error(await res.text())
        }

        const data = await res.json()

        return data.message.content
    }
}

export default new OllamaProvider()