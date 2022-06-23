import {isValidImage} from "./isValidImage";

export const createPost = async(
    isUploading: boolean,
    setIsUploading: Function,
    tagline: string,
    imageUrl: string,
    password: string
) => {
    if(isUploading) {
        return {
            success: false,
            error: "Hold on we are uploading..."
        }
    }

    if(tagline.length < 3 || tagline.length > 50){
        return {
            success: false,
            error: "Tagline should be greater than 3 and less than 50"
        }
    }

    if(imageUrl.length < 1 || !isValidImage(imageUrl)){
        return {
            success: false,
            error: "Please provide a valid image"
        }
    }

    if(password.length < 8 || password.length > 20){
        return {
            success: false,
            error: "Password must be at least 8 and at most 20 characters long..."
        }
    }

    setIsUploading(true);

    try{
        const response = await fetch("/api/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tagline,
                image: imageUrl,
                password
            })
        });

        const data = await response.json();

        setIsUploading(false);

        if(!data.success){
            return {
                success: false,
                error: data.error
            };
        }

        return {
            success: data.success,
            post: data.data.post
        };
    }
    catch(error){
        console.log(error);
        setIsUploading(false);

        return {
            success: false,
            error: `${error}`
        };
    }
}