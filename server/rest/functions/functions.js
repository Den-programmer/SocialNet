import mongoose from 'mongoose';

function generateUniqueId() {
    return new mongoose.Types.ObjectId().toString()
}

export {generateUniqueId}