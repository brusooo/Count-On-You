import clientPromise from "../../../lib/mongodb";


export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("MyUsers");
  const todoUsers = db.collection("users");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      const user = await todoUsers
        .find({ email : bodyObject.email }) 
        .toArray();

      if (user.length == 0) {
        let newUser = await todoUsers.insertOne(bodyObject);
      }
      return res.status(204).end();

    
    }
}
