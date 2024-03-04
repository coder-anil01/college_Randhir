import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Data Base Connected');
    } catch (error) {
        console.log("Database connected failed",error)
    }
}

export default connectDb;