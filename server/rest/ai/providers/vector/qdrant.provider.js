import {QdrantClient} from "@qdrant/js-client-rest"


class QdrantProvider {

    constructor() {
        this.DEFAULT_VECTOR_SIZE = 768; // if changed ai, update this value accordingly
        this.client = new QdrantClient({
            url:
                process.env.QDRANT_URL ||
                "http://localhost:6333"
        })

        this.collection =
            "posts"
    }


    async createCollection() {

        const collections =
            await this.client.getCollections()


        const exists =
            collections.collections.some(
                c => c.name === this.collection
            )


        if (!exists) {

            await this.client.createCollection(
                this.collection,
                {
                    vectors: {
                        size: this.DEFAULT_VECTOR_SIZE, 
                        distance: "Cosine"
                    }
                }
            )
        }
    }


    async upsertPost(
        postId,
        vector,
        payload
    ) {

        await this.client.upsert(
            this.collection,
            {
                points: [
                    {
                        id: postId,
                        vector,
                        payload
                    }
                ]
            }
        )
    }


    async search(vector, limit = 10) {

        return await this.client.search(
            this.collection,
            {
                vector,
                limit
            }
        )
    }


    async deletePost(postId) {
        await this.client.delete(
            this.collection,
            {
                points: [postId]
            }
        )
    }

}


export default new QdrantProvider()