import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;



// if (process.env.NODE_ENV === "production") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
// }

clientPromise.catch((error)=> { 
  return { data : 'error'}});

export default clientPromise;
