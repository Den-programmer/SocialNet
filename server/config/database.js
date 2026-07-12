import mongoose from "mongoose";

export async function connectDatabase() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}