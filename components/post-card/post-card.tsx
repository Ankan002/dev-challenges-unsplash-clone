import React, {useState} from 'react';
import DeleteModal from "../delete-modal";

interface Props{
    postId: string;
    postImage: string;
    postTagline: string;
}

const PostCard = (props: Props) => {

    const {postId, postImage, postTagline} = props;

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const onDeleteButtonClick = () => {
        setIsDeleteModalOpen(true);
    }

    return (
        <div className="p-5  w-full flex flex-col items-center">
            <div className='w-full flex flex-col items-center relative'>
                <img src={postImage} className='rounded-3xl w-full object-contain block' />
                <div
                    className='absolute top-0 bottom-0 w-full h-full opacity-0 hover:opacity-80 bg-black/20 p-5 rounded-3xl flex flex-col justify-between items-center hover:cursor-pointer transition-all ease-in-out delay-100'
                >
                    <div className="w-full flex items-center justify-end">
                        <button className="px-2 py-0.5 border-[1px] border-primary-red font font-raleway text-primary-red text-xs rounded-md" onClick={onDeleteButtonClick}>
                            Delete
                        </button>
                    </div>
                    <h1 className='text-white lg:text-lg md:text-base text-sm font-raleway'>{postTagline}</h1>
                </div>
            </div>
            <DeleteModal isDeletePostModalOpen={isDeleteModalOpen} setIsDeletePostModalOpen={setIsDeleteModalOpen} postId={postId} />
        </div>
    );
};

export default PostCard;
