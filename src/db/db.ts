import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`connected to mongo db at ${connection.connection}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongo;
