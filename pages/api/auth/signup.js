import { DbConnect } from "../../../helper/db-util";
import { generateHash } from "../../../lib/hashPassword";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log("hello");
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 8
    ) {
      res.status(422).json({ message: "Invalid format of email or password" });

      return;
    }

    const client = await DbConnect();
    const db = client.db(process.env.DB_NAME);
    console.log(email, password);
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "User already exist" });
      client.close();
      return;
    }
    const hashedPassword = await generateHash(password);

    const resss = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });
    console.log(resss);
    res.status(200).json({ message: "Signup Succesfully" });
    client.close();
  }
}
