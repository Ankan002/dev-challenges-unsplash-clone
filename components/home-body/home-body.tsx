import React from 'react';
import {useRecoilValue} from "recoil";
import {postsAtom} from "../../atom/posts-atom";
import {PostType} from "../../Types/PostType";
import PostCard from "../post-card";
import {searchTermAtom} from "../../atom/search-term-atom";

const HomeBody = () => {

    const posts = useRecoilValue<Array<PostType>>(postsAtom);
    const searchTerm = useRecoilValue<string>(searchTermAtom);

    return (
        <div className="w-full lg:masonry-5-col md:masonry-3-col sm:masonry-2-col masonry-1-col lg:px-8 md:px-6 px-5">
            {
                posts
                    .filter(
                        (post) => {
                            if(searchTerm === "") return post;

                            if(post.tagline.toLowerCase().includes(searchTerm.toLowerCase())) return post;
                        }
                    )
                    .map((post) => {
                    return (
                        <div key={post._id} className="w-full break-inside">
                            <PostCard postId={post._id} postImage={post.image} postTagline={post.tagline} />
                        </div>
                    )
                })
            }
        </div>
    );
};

export default HomeBody;
