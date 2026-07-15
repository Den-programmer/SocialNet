import embeddingProvider from "../providers/embedding.provider.js";
import qdrantProvider from "../providers/vector/qdrant.provider.js";
import Post from "../../models/post.js";


class PostSearchService {


    async searchPosts(query) {


        // 1. Convert user text into vector

        const queryVector =
            await embeddingProvider.embed(query);



        // 2. Search similar vectors

        const results =
            await qdrantProvider.search(
                queryVector,
                10
            );



        // 3. Get MongoDB documents

        const postIds =
            results.map(
                item => item.payload.postId
            );



        const posts =
            await Post.find({
                _id:{
                    $in:postIds
                }
            });



        // 4. Return posts

        return posts;
    }
}


export default new PostSearchService();