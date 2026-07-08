class OllamaProvider {
    constructor() {
        this.url = process.env.OLLAMA_URL || 'http://localhost:11434'
        this.model = process.env.OLLAMA_MODEL || 'qwen3'
    }

    async chat(messages, tools = []) {
        const payload = {
            model: this.model,
            messages,
            stream: false,
            options: {
                temperature: 0.5,
                num_ctx: 4096,
                num_predict: 256
            }
        }

        if (tools.length > 0) {
            payload.tools = tools
        }

        const res = await fetch(`${this.url}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        if (!res.ok) {
            throw new Error(await res.text())
        }

        const data = await res.json()

        return data.message
    }
}

export default new OllamaProvider()