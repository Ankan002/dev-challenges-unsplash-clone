import Post from "../../../models/Post";
import Bcrypt from "bcrypt";
import connectDB from "../../../config/connect-to-db";
import {NextApiRequest, NextApiResponse} from "next";
import {DatabasePostType} from "../../../Types/PostType";

const deletePost = async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "DELETE"){
        return res.status(400).json({
            success: false,
            error: "This route does not exist"
        });
    }

    const {postId, password} = req.body;

    try {
        await connectDB();

        const post: DatabasePostType | null = await Post.findById(postId);

        if(!post){
            return res.status(400).json({
                success: false,
                error: "No such posts found!!"
            });
        }

        const isPasswordSame = await Bcrypt.compare(password, post.password);

        if(!isPasswordSame){
            return res.status(401).json({
                success: false,
                error: "Access Denied"
            });
        }

        await Post.findByIdAndDelete(postId);

        return res.status(200).json({
            success: true
        });
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            error: "Internal Server Error!!"
        });
    }
}

export default deletePost;