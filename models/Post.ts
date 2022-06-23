import mongoose, {Schema, Model} from "mongoose";
import {PostSchemaType} from "../Types/PostSchemaType";

const PostSchema = new Schema({
    tagline: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Post = mongoose.models.Post || mongoose.model<Model<PostSchemaType>>("Post", PostSchema);

export default Post;