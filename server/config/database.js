import mongoose from "mongoose";
import { storagePolicy } from './storagePolicy.js'

export async function connectDatabase() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        const stats = await mongoose.connection.db.stats()
        const usedBytes = Math.max(stats.storageSize || 0, stats.dataSize || 0)
        if (usedBytes >= storagePolicy.applicationStorageBytes) {
            throw new Error(
                `MongoDB application storage budget exceeded: ${usedBytes} bytes used of ${storagePolicy.applicationStorageBytes}`
            )
        }
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}