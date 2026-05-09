import mongoose from 'mongoose'

const connectDB = async (err) => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/ECommerce`)
        console.log("MongoDB connected successfully!");  
    } catch (error) {
        console.log('MongoDB connection failed!',error);
    }
}
export default connectDB