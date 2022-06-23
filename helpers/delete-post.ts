export const deletePost = async(
    deleting: boolean,
    setDeleting: Function,
    postId: string,
    password: string
) => {
    if(deleting) {
        return {
            success: false,
            error: "Hold on we are deleting the post..."
        }
    }

    if(password.length < 8 || password.length > 20){
        return {
            success: false,
            error: "Password must be at least 8 and at most 20 characters long..."
        }
    }

    setDeleting(true);

    try{
        const response = await fetch("/api/post/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postId,
                password
            })
        });

        const data = await response.json();

        setDeleting(false);

        if(!data.success) return{
            success: data.success,
            error: data.error
        };

        return {
            success: data.success
        };
    }
    catch (error){
        console.log(error);
        setDeleting(false);

        return {
            success: false,
            error: "Internal Server Error"
        };
    }
}