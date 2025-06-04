import mongoose from "mongoose"

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);    
    console.log("connected to mongo DB")
  } catch (error) {
    console.log("Error in connecting to database", error.message);
    
  }
}

export default conn;
