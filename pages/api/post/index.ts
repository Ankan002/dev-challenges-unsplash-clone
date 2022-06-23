import {NextApiRequest, NextApiResponse} from "next";
import Post from "../../../models/Post";
import connectDB from "../../../config/connect-to-db";

const fetchAllPosts = async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "GET"){
        return res.status(400).json({
            success: false,
            error: "No such route exists"
        });
    }

    try{
        await connectDB();

        const posts = await Post.find({}).select("-password").sort("-createdAt");

        return res.status(200).json({
            success: true,
            data: {
                posts
            }
        })
    }
    catch (error){
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};

export default fetchAllPosts;