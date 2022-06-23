import React from 'react';
import {BiCloudUpload} from "react-icons/bi"
import {useRecoilState} from "recoil";
import {searchTermAtom} from "../../atom/search-term-atom";

const icon = require("../../public/story-icon.svg");

interface Props{
    setIsCreatePostModalOpen: Function;
}

const Navbar = (props: Props) => {
    const {setIsCreatePostModalOpen} = props;

    const [searchTerm, setSearchTerm] = useRecoilState<string>(searchTermAtom);

    return (
        <div className="px-3 py-2 flex items-center">
            <div className="flex-grow flex items-center">
                <img src={icon?.default?.src} className="w-8 h-8 mr-1" />
                <input className="mx-2 lg:w-1/4 md:w-2/3 w-full border-[1px] h-8 px-2 rounded-md border-primary-grey outline-none font-thin" placeholder="Search By Name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoComplete="bfkuewgafukagwuyfgjha" />
            </div>
            <button className="bg-primary-green px-2 py-1 rounded-md flex items-center justify-center min-h-8" onClick={() => setIsCreatePostModalOpen(true)}>
                <BiCloudUpload className="text-white lg:text-3xl md:text-2xl sm:text-xl text-lg mr-1" />
                <h1 className="text-white md:block hidden">Upload</h1>
            </button>
        </div>
    );
};

export default Navbar;
