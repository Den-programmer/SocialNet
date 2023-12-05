const mongoose = require('mongoose')

function generateUniqueId() {
    return mongoose.Types.ObjectId().toString()
}

module.exports = {generateUniqueId}