import React, { useEffect, useState } from "react";
import Signup from "../components/authentication/signup";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Spinner from "../components/ui/spinner";

export default function signup() {
  return <Signup />;
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
