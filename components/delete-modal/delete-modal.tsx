import React, {useState} from 'react';
import Modal from "react-modal";
import {toast} from "react-hot-toast";
import ModalField from "../modal-field";
import ModalInput from "../modal-input";
import {deletePost} from "../../helpers";
import {useRecoilState} from "recoil";
import {postsAtom} from "../../atom/posts-atom";
import {PostType} from "../../Types/PostType";

interface Props{
    isDeletePostModalOpen: boolean;
    setIsDeletePostModalOpen: Function;
    postId: string;
}

const modalStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.3)"
    }
};

const DeleteModal = (props: Props) => {
    const {isDeletePostModalOpen, setIsDeletePostModalOpen, postId} = props;

    const [deleting, setDeleting] = useState<boolean>(false);
    const [deletingPassword, setDeletingPassword] = useState<string>("");

    const [posts, setPosts] = useRecoilState<Array<PostType>>(postsAtom);

    const onBackClick = () => {
        if(deleting){
            toast.error("Hold on we are deleting the image...");
            return;
        }

        setIsDeletePostModalOpen(false);
    }

    const onDeleteClick = async() => {
        const loadingToast = toast.loading("Deleting Post...")

        const response = await deletePost(deleting, setDeleting, postId, deletingPassword);

        toast.dismiss(loadingToast);

        if(!response.success){
            toast.error(response.error);
            return;
        }

        setDeletingPassword("");

        setPosts(posts.filter(post => post._id !== postId));

        toast.success("Deleted Post Successfully");

        setIsDeletePostModalOpen(false);
    }

    const onAfterClose = () => {
        setDeletingPassword("");
    }

    return (
        <Modal
            isOpen={isDeletePostModalOpen}
            onRequestClose={onBackClick}
            style={modalStyles}
            onAfterClose={onAfterClose}
            ariaHideApp={false}
            className="w-full min-h-screen flex justify-center items-center p-3"
        >
            <div className="lg:w-1/3 md:w-2/3 w-full bg-white p-3 rounded-md">
                <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base font-light">
                    Are you sure?
                </h1>

                <ModalField fieldName="Deleting Password" />
                <ModalInput placeholder="Deleting Password" inputStateValue={deletingPassword} setInputStateValue={setDeletingPassword} inputType="password" />

                <div className="w-full my-2 flex justify-end">
                    <button className="px-2 py-1 flex justify-center items-center rounded-md text-primary-grey md:text-base text-xs mr-2" onClick={onBackClick}>
                        Close
                    </button>

                    <button className="px-2 py-1 flex justify-center items-center bg-primary-red rounded-md text-white md:text-base text-xs" onClick={onDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
