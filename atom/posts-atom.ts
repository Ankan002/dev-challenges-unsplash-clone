import {atom} from "recoil";
import {PostType} from "../Types/PostType";

export const postsAtom = atom<Array<PostType>>({
    key: "postsAtom",
    default: []
});