import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

class OllamaProvider {
    constructor() {
        this.url = process.env.OLLAMA_URL
        this.model = process.env.OLLAMA_MODEL
        this.embeddingModel =
            process.env.OLLAMA_EMBEDDING_MODEL
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


    async embed(input) {
        const res = await fetch(`${this.url}/api/embed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: this.embeddingModel,
                input
            })
        })

        if (!res.ok) {
            throw new Error(await res.text())
        }

        const data = await res.json()

        return data.embeddings[0]
    }
}

export default new OllamaProvider()