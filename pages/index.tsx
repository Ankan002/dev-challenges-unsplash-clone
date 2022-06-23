import type {NextPage} from 'next';
import CustomHead from "../components/custom-head";
import Navbar from "../components/navbar";
import {useEffect, useRef, useState} from "react";
import CreateModal from "../components/create-modal";
import {fetchAllPosts} from "../helpers";
import {Triangle} from "react-loader-spinner"
import HomeBody from "../components/home-body";
import {useRecoilState} from "recoil";
import {postsAtom} from "../atom/posts-atom";
import {PostType} from "../Types/PostType";

const Home: NextPage = () => {

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);

  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [posts, setPosts] = useRecoilState<Array<PostType>>(postsAtom);
  const isFirstTimeMounted = useRef<boolean>(false);

  const initialFetch = async() => {
      const response = await fetchAllPosts(initialLoading, setInitialLoading);

      setPosts(response.posts);

      console.log(response);
  }

  useEffect(() => {
      if(!isFirstTimeMounted.current){
          isFirstTimeMounted.current = true;

          initialFetch()
              .catch(err => console.log(err));
      }
  }, []);

  return (
    <div className="flex min-h-screen flex-col font-raleway">
      <CustomHead title="Story Pedia" />

      <Navbar setIsCreatePostModalOpen={setIsCreatePostModalOpen} />

        {
            initialLoading ? (
                <div className="flex-grow flex justify-center items-center">
                    <Triangle color="#3DB46D" />
                </div>
            ) : (
                <HomeBody />
            )
        }


      <CreateModal isCreatePostModalOpen={isCreatePostModalOpen} setIsCreatePostModalOpen={setIsCreatePostModalOpen} />
    </div>
  );
};


export default Home;
