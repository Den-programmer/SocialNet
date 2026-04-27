import mongoose from 'mongoose';
import sharp from 'sharp';

function generateUniqueId() {
    return new mongoose.Types.ObjectId().toString()
}

async function compressImage(buffer, mimetype) {
    let sharpInstance = sharp(buffer);

    if (mimetype === 'image/png') {
        sharpInstance = sharpInstance.png({ quality: 70, compressionLevel: 8 });
    } else if (mimetype === 'image/webp') {
        sharpInstance = sharpInstance.webp({ quality: 70 });
    } else {
        sharpInstance = sharpInstance.jpeg({ quality: 70, mozjpeg: true });
    }

    const compressedBuffer = await sharpInstance.toBuffer();
    return compressedBuffer;
}

export { generateUniqueId, compressImage }