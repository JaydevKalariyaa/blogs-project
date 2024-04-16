import { DbConnect } from "../../../helper/db-util";
import bcrypt from "bcryptjs";
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

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

    const existingUser = await db.collection("users").findOne({ email: email });
    if (!existingUser) {
      res.status(422).json({ message: "User Not exist ,Register Now" });
      client.close();
      return;
    }

    const ress = await bcrypt.compare(password, existingUser.password);
    if (ress) {
      res.status(200).json({ message: "Login Succesfully" });
      client.close();
      return;
    } else {
      res.status(422).json({ message: "Incorrect Email or Password." });
      client.close();
      return;
    }
  }
}
