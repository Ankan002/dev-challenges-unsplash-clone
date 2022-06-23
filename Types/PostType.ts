import mongoose from "mongoose";

export interface DatabasePostType{
    _id: mongoose.ObjectId;
    tagline: string;
    image: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PostType{
    _id: string;
    tagline: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}