import mongoose from "mongoose";
import config from "config";
import Logger from "../../utils/logger.util";

const dbUrl = config.get<string>("dbUrl");

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(dbUrl);
        Logger.log('🚀 Database connected successfully');
    } catch (error: any) {
        Logger.log(error.message);
        setTimeout(connectDB, 5000);
    }
};

export default connectDB;
