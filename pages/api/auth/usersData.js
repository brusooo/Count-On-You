import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  
  // console.log(client.topology.s.state)
  // if (client.topology.s.state !== 'connected'){
  //   return res.json({ error : 'not connected' });
  // }

  const db = client.db("MyUsers");
  const usersData = db.collection("usersData");

  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      const user = await usersData.find({ email: bodyObject.email }).toArray();

      if (user.length == 0) {
        let newUser = await usersData.insertOne(bodyObject);
      } else {
        const result = await usersData.updateOne(
          { email: bodyObject.email },
          { $set: { data: bodyObject.data } }
        );
      }
      return res.json({ result: "Successful" });

    case "GET":
      const users = await usersData
        .find(
          {
            email: req.query.email,
          },
          { projection: { _id: 0, name: 0 } }
        )
        .toArray();


      return res.json( { users } );
  }
}
