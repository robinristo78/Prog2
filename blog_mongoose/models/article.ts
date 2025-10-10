import mongoose from "mongoose";
import author from "./author.ts";

const article = new mongoose.Schema({
    header: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    comments: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment' 
        }
    ],
    author: {
        required: true,
        type: mongoose.Schema.Types.ObjectId, ref: 'Author'
    }
})

export default mongoose.model('Article', article);