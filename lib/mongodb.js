import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;




client = new MongoClient(uri, options);
global._mongoClientPromise = client.connect();

clientPromise = global._mongoClientPromise;


clientPromise.catch((error) => {
  return { data: 'error' }
});

export default clientPromise;
