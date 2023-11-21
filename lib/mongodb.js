import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let clientPromise;

clientPromise = new MongoClient(uri, options);

const connectToDB = async () => {
  try {
    await clientPromise.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDB();

export default clientPromise;
