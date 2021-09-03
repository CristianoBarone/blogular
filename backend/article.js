const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new  Schema({
    title: {
        type: String,
        required: true
    }
,
    abstract: {
        type: String,
        required: true
    }
,
    content: {
        type: String,
        required: true
    }
,
    id: {
        type: Number,
        required: true
    }
}, { timestamps: false });

const Article = mongoose.model('Article', articleSchema)

module.exports = Article;