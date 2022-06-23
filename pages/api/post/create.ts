import Post from "../../../models/Post";
import connectDB from "../../../config/connect-to-db";
import Bcrypt from "bcrypt";
import {NextApiRequest, NextApiResponse} from "next";
import { isValidImage } from "../../../helpers";

const createPost = async(req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== "POST"){
        return res.status(400).json({
            success: false,
            error: "This route does not exist"
        });
    }

    const { tagline, image, password } = req.body;

    if(!tagline || !image || !password){
        return res.status(400).json({
            success: false,
            error: "Please provide a valid tagline, image and password"
        });
    }

    if(!isValidImage(image)){
        return res.status(400).json({
            success: false,
            error: "Please provide a valid image URL!!"
        });
    }

    try{
        await connectDB();

        const salt = await Bcrypt.genSalt();
        const encryptedPassword = await Bcrypt.hash(password, salt);

        const newPost = await Post.create({
            tagline,
            image,
            password: encryptedPassword
        });

        return res.status(200).json({
            success: true,
            data: {
                post: newPost
            }
        });
    }
    catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            error: "Internal Server Error!!"
        });
    }
}

export default createPost;