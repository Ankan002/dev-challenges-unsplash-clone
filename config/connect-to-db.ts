import mongoose from "mongoose";

interface DatabaseProps{
    isConnected?: mongoose.ConnectionStates;
}

let database: DatabaseProps = {};

const connectDB = async() => {
    if(database.isConnected) return;

    try{
        const db = await mongoose.connect(process.env.NEXT_PUBLIC_DB_URI ?? "");

        database.isConnected = db.connections[0].readyState;
    }
    catch (error){
        console.log(error);
    }
};

export default connectDB;