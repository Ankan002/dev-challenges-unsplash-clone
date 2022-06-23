export const fetchAllPosts = async(
    isPostsLoading: boolean,
    setIsPostsLoading: Function
) => {
    if(isPostsLoading) return{
        success: false,
        error: "Hold on we are loading the images"
    };

    setIsPostsLoading(true);

    try{
        const response = await fetch("/api/post", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        setIsPostsLoading(false);

        if(!data.success) return {
            success: false,
            error: data.error
        };

        return {
            success: data.success,
            posts: data.data.posts
        }
    }
    catch (error){
        console.log(error);
        setIsPostsLoading(false);

        return {
            success: false,
            error: "Internal Server Error"
        }
    }
}