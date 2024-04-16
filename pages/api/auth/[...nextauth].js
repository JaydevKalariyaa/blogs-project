import NextAuth from "next-auth";
// import Providers from 'next-auth/providers'
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/hashPassword";
import { DbConnect } from "../../../helper/db-util";

export default NextAuth({
  session: { jwt: true },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.email.includes("@")) {
          throw new Error("Invalid email address");
        }
        const client = await DbConnect();
        const usersCollection = client
          .db(process.env.DB_NAME)
          .collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("user not exists");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("invalid credentials");
        }
        return { email: user.email };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
});
