import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    const client = await MongoClient.connect(
      "mongodb+srv://morgenthalerhowie:jKF51LwWQkpsJf9o@cluster0.tel5fgh.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupCollection = db.collection("meetups");

    const result = await meetupCollection.insertOne( data );

    client.close();

    res.status(201).json({ message: "Meetup Inserted!" });
  }
};

export default handler;
