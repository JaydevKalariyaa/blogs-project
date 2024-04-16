import React from "react";

import { getSession } from "next-auth/react";
import ChangePassword from "../components/authentication/ChangePassword";
export default function Profile({ session }) {
  return (
    <>
      <h1 style={{ color: "white", textAlign: "center" }}>
        {session.user.email}
      </h1>
      <ChangePassword />
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
