import mongoose from "mongoose";
import { DB_URL } from "../config";

const connectDB =async() =>{
try {
 await mongoose.connect(DB_URL)
 console.log("database is connected");
} catch (error) {
    console.log("database failed");
}
}

export default connectDB