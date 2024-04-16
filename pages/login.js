import React from "react";
import Login from "../components/authentication/login";

import { getSession } from "next-auth/react";

export default function Loginn() {
  return (
    <>
      <Login />
    </>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
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
