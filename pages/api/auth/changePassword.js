import { getSession } from "next-auth/react";
import { DbConnect } from "../../../helper/db-util";
import { verifyPassword, generateHash } from "../../../lib/hashPassword";

async function handler(req, res) {
  try {
    if (req.method !== "PATCH") {
      return;
    }
    // const session = await getSession({ req });

    // console.log("session", session);
    // if (!session) {
    //   console.log("first");
    //   res.status(401).json({ error: "not authenticated" });
    //   return;
    // }
    // console.log("session--", session);

    // const userEmail = "admin@gmail.com";

    const session = req.body.session;
    console.log(session);
    if (!session) {
      console.log("first");
      res.status(401).json({ error: "not authenticated" });
      return;
    }
    const userEmail = req.body.session.user.email;
    console.log("userEmail", userEmail);
    const oldPassword = req.body.data.oldPassword;
    const newPassword = req.body.data.newPassword;

    const client = await DbConnect();
    const usersCollection = client.db(process.env.DB_NAME).collection("users");
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      res.status(404).json({ error: "User not found." });
      client.close();
      return;
    }

    const passwordsAreEqual = await verifyPassword(oldPassword, user.password);
    if (!passwordsAreEqual) {
      res.status(403).json({ error: "Invalid password." });
      client.close();
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      res.status(403).json({ error: "Password length must be atleast 8." });
      client.close();
      return;
    }
    if (newPassword === oldPassword) {
      res
        .status(403)
        .json({ error: "new Password & old password cannot be same." });
      client.close();
      return;
    }
    const hashedPswd = await generateHash(newPassword);
    const result = await usersCollection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPswd } }
    );

    client.close();
    res.json({ message: "password updated" });
  } catch (err) {
    res.json({ error: err.message });
  }
}

export default handler;
