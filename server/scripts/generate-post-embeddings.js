import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "../config/database.js";
import mongoose from "mongoose";
import Post from "../rest/models/post.js";
import embeddingProvider from "../rest/ai/providers/embedding.provider.js";


await connectDatabase();


const posts = await Post.find();

console.log(`Found ${posts.length} posts`);


for (const post of posts) {
    const embedding = await embeddingProvider.embed(
        `${post.postTitle}\n${post.postInf}`
    );

    post.embedding = embedding;

    await post.save();

    console.log(`Updated post ${post._id}`);
}


await mongoose.disconnect();