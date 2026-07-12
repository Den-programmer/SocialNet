import ollamaProvider from "./ollama.provider.js"

class EmbeddingProvider {
    async embed(text) {
        return await ollamaProvider.embed(text)
    }
}

export default new EmbeddingProvider()