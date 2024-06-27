import mongoose from "mongoose";


export const dbConnect = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb conneted")
    } catch (error) {
        console.log("mongodb error", error.message)
    }
}