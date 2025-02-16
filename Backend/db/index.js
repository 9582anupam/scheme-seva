import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";



const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Error connecting to MongoDB\n\n", error);
        process.exit(1);
    }
};

export default connectDB;