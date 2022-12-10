import clientPromise from "../../../lib/mongodb";
import bcrypt from 'bcryptjs';



export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("MyUsers");
  const todoUsers = db.collection("users");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      const user = await todoUsers
      .find({ name : bodyObject.name }) 
      .toArray();
      if (user.length == 0) {
        let newUser = await todoUsers.insertOne(bodyObject);
        return res.json({ result: "Successful" });
      }
      return res.json({ result : "Unsuccessful" });

    case "GET":
      const users = await todoUsers
        .find({
          name: req.query.name,
          email: req.query.email,
        })
        .toArray();
      
      
      if(bcrypt.compareSync(req.query.password, users[0].password))
      { 
        res.json(users[0]); }
      else{
        return false
      }

      break;
  }
}
