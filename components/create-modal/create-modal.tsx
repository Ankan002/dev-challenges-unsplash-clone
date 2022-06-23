import React, {useState} from 'react';
import Modal from "react-modal";
import ModalField from "../modal-field";
import ModalInput from "../modal-input";
import {toast} from "react-hot-toast";
import {createPost} from "../../helpers";
import {useRecoilState} from "recoil";
import {postsAtom} from "../../atom/posts-atom";
import {PostType} from "../../Types/PostType";

interface Props{
    isCreatePostModalOpen: boolean;
    setIsCreatePostModalOpen: Function;
}

const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.3)"
    }
};

const CreateModal = (props: Props) => {
    const {isCreatePostModalOpen, setIsCreatePostModalOpen} = props;

    const [tagline, setTagline] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [uploading, setUploading] = useState<boolean>(false);

    const [posts, setPosts] = useRecoilState<Array<PostType>>(postsAtom);

    const onBackClick = () => {
        if(uploading){
            toast.error("Hold on we are uploading the image...");
            return;
        }

        setIsCreatePostModalOpen(false);
    };

    const onUploadClick = async() => {
        toast.loading("Posting...");

        const response = await createPost(uploading, setUploading, tagline, imageUrl, password);

        toast.dismiss();

        if(!response.success){
            toast.error(`${response.error}`);
            return;
        }

        setPosts([response.post, ...posts]);

        toast.success("Uploaded successfully...");

        setTagline("");
        setImageUrl("");
        setPassword("");
    }

    const onAfterClose = () => {
        setTagline("");
        setImageUrl("");
        setPassword("");
    }

    return (
        <Modal
            isOpen={isCreatePostModalOpen}
            onRequestClose={onBackClick}
            style={modalStyles}
            onAfterClose={onAfterClose}
            ariaHideApp={false}
            className="w-full min-h-screen flex justify-center items-center p-3"
        >
            <div className="lg:w-1/3 md:w-2/3 w-full bg-white p-3 rounded-md">
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base font-light">
                    Add a new Photo
                </h1>

                <ModalField fieldName="Tagline" />
                <ModalInput placeholder="Story Tagline" inputStateValue={tagline} setInputStateValue={setTagline} inputType="text" />

                <ModalField fieldName="Image URL" />
                <ModalInput placeholder="Image Url" inputStateValue={imageUrl} setInputStateValue={setImageUrl} inputType="text" />

                <ModalField fieldName="Password" />
                <ModalInput placeholder="Deleting Password" inputStateValue={password} setInputStateValue={setPassword} inputType="password" />

                <div className="w-full my-2 flex justify-end">
                    <button className="px-2 py-1 flex justify-center items-center rounded-md text-primary-grey md:text-base text-xs mr-2" onClick={onBackClick}>
                        Close
                    </button>

                    <button className="px-2 py-1 flex justify-center items-center bg-primary-green rounded-md text-white md:text-base text-xs" onClick={onUploadClick}>
                        Upload
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateModal;
