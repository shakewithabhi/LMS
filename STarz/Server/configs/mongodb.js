import mongoose from "mongoose";

const connectDB = async () => {
    //mongodb connection
    mongoose.connection.on("connected", () => console.log('database connected') );
   await mongoose.connect(`${process.env.MONGO_URI}/starz`, )
}

export default connectDB;