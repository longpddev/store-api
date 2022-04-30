const mongoose = require('mongoose')
const schema = mongoose.Schema;

const categorySchema = new schema({
    id: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    image: String
})

module.exports = mongoose.model('category', categorySchema)
