import mongoose from "mongoose";
const URIMONGO = process.env.URIMONGO;

const databaseConnection = async ()=>{
    try {
        await mongoose.connect(URIMONGO)
        console.log("Database connected")
    } catch (error) {
        
    }
}
export default databaseConnection

