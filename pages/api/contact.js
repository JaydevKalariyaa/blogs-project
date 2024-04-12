import { DbConnect, insertDocument } from "../../helper/db-util";
export default async function Handler(req, res) {
  if (req.method === "POST") {
    try {
      const client = await DbConnect();
      let data = req.body;

      await insertDocument(client, data, "contactData");

      res.status(201).json({ message: "Message send succesfully!" });
      await client.close();
    } catch (error) {
      res.status(500).json({ message: "error in sending messages!" });
    }
  }
}
